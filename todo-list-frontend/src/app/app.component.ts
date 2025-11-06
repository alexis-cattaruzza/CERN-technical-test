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
      <app-todo-item *ngFor="let todo of filteredTodos" [item]="todo"></app-todo-item>
      <div class="message" *ngIf="message">{{ message }}</div>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  searchTerm: string = '';
  isLoading = false;
  message: string = '';

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
      error: () => {
        console.error('Failed to load todos');
        this.isLoading = false;
      }
    });
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredTodos = this.todos.filter(todo => todo.task.toLowerCase().includes(term));
    this.message = this.filteredTodos.length ? '' : 'No results found';
  }
}
