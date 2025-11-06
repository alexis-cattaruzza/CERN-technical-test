import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";

export interface Todo {
  id: number;
  task: string;
  priority: 1 | 2 | 3;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = '/api/todos';
  
  constructor(private http: HttpClient) {}

  // Simulate a delay for loading indicator demonstration
  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      delay(2000)
    );
  }

  remove(id: number): Observable<void> {
    // Simulate random failure for demonstration
    if (Math.random() < 0.2) {
      return new Observable<void>(observer => {
        setTimeout(() => {
          observer.error('Random failure');
          observer.complete();
        }, 1000);
      });
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
