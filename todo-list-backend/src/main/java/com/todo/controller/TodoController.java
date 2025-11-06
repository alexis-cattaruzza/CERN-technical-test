package com.todo.controller;

import com.todo.entity.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {
    
    @Autowired
    private TodoRepository todoRepository;
    
    // GET /api/todos
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        try {
            List<Todo> todos = todoRepository.findAll();
            return new ResponseEntity<>(todos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // GET /api/todos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable("id") Long id) {
        return todoRepository.findById(id)
                .map(todo -> new ResponseEntity<>(todo, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // POST /api/todos
    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        try {
            Todo newTodo = todoRepository.save(todo);
            return new ResponseEntity<>(newTodo, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // DELETE /api/todos/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTodo(@PathVariable("id") Long id) {
        try {
            todoRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}