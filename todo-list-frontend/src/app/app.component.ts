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
      <input id="search" type="text">
      <app-progress-bar *ngIf="isLoading"></app-progress-bar>
      <app-todo-item *ngFor="let todo of todos" [item]="todo"></app-todo-item>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];
  isLoading = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.isLoading = true;
    this.todoService.getAll().subscribe({
      next: (data) => {
        this.todos = data;
        this.isLoading = false;
      },
      error: () => {
        console.error('Failed to load todos');
        this.isLoading = false;
      }
    });
  }
}
