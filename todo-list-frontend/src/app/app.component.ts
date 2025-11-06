import {Component, OnInit} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  template: `
    <div class="title">
      <h1>
        A list of TODOs
      </h1>
    </div>
    <div class="list">
      <label for="search">Search...</label>
      <input 
        id="search" 
        type="text"
        [(ngModel)]="searchTerm"
        (input)="onSearchChange()"
      />
      <app-progress-bar *ngIf="isLoading"></app-progress-bar>

      <!-- Message de succès -->
      <div class="message success" *ngIf="successMessage">
        ✓ {{ successMessage }}
      </div>

      <div class="message error" *ngIf="errorMessage">{{ errorMessage }}</div>

      <app-todo-item 
        *ngFor="let todo of filteredTodos" 
        [item]="todo"
        (click)="askDeleteConfirmation(todo)"
      >
      </app-todo-item>
      <div class="message info" *ngIf="!isLoading && filteredTodos.length === 0 && todos.length > 0">
        No results found
      </div>

      <!-- Modal de confirmation -->
      <app-confirmation-modal
        [show]="showConfirmModal"
        [message]="confirmMessage"
        (confirm)="onConfirmationDelete($event)">
      </app-confirmation-modal>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  searchTerm: string = '';
  isLoading = false;
  errorMessage: string = '';
  successMessage: string = '';

  // Modal state
  showConfirmModal = false;
  confirmMessage = '';
  todoToDelete: Todo | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.isLoading = true;
    this.todoService.getAll().subscribe({
      next: (data) => {
        this.todos = data;
        this.filteredTodos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load todos', err);
        this.errorMessage = 'Failed to load todos. Please try again.';
        this.isLoading = false;
        this.hideMessageAfterDelay('error');
      }
    });
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredTodos = this.todos.filter(todo => todo.task.toLowerCase().includes(term));
  }

  // Open the confirmation modal
  askDeleteConfirmation(todo: Todo): void {
    this.todoToDelete = todo;
    this.confirmMessage = `Are you sure you want to delete the task: "${todo.task}"?`;
    this.showConfirmModal = true;
  }
  
  // Manage the confirmation response
  onConfirmationDelete(confirmed: boolean): void {
    this.showConfirmModal = false;
    
    if (confirmed && this.todoToDelete) {
      this.deleteTodo(this.todoToDelete);
    }
    
    this.todoToDelete = null;
  }

  deleteTodo(todo: Todo) {
    this.todoService.remove(todo.id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.id !== todo.id);
        this.filteredTodos = this.filteredTodos.filter(t => t.id !== todo.id);
        
        this.successMessage = `Task "${todo.task}" deleted successfully!`;
        this.errorMessage = '';
        
        // Hide after delay
        this.hideMessageAfterDelay('success');
      },
      error: (err) => {
        // Show error message
        this.errorMessage = `Failed to delete "${todo.task}". Please try again.`;
        this.successMessage = '';
        
        this.hideMessageAfterDelay('error');
      }
    });
  }

  // Hide messages after a delay
  hideMessageAfterDelay(type: 'success' | 'error'): void {
    setTimeout(() => {
      if (type === 'success') {
        this.successMessage = '';
      } else {
        this.errorMessage = '';
      }
    }, 3000);
  }
}
