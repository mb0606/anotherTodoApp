import { Component, OnInit } from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Todo} from "../classes/Todo";

@Component({
  selector: 'my-todos',
  template: `
    <div class="add-todo-form text-center">
      <h1>Add Todo</h1>
      <div class="form-group">
        <input  type="text" 
                class="form-control input-lg" 
                placeholder="Add Todo" 
                autofocus 
                #todoText
                required>
                <br>
        <button (click)="addTodo($event, todoText);" class="btn btn-primary btn-block">Create</button>
      </div><!-- form group -->  
    </div><!-- add todo -->
    
    <div class="todo-list">
        <div class="row" *ngFor="let todo of todos">
        <div class="col-xs-1">
          <input type="checkbox" [checked]="todo.isCompleted" (click)="updateStatus(todo)">
        </div><!-- col -1 -->
        <div class="col-xs-7">
        <span (click)="setEditState(todo, true)" [class.hidden]="todo.isEditMode" 
        [class.done]="todo.isCompleted">{{todo.text}}</span>
        <input type="text" 
               [class.hidden]="!todo.isEditMode" 
               [value]="todo.text"
               (keypress)="updateTodoText($event, todo)"
               >
         <input 
               class="btn btn-warning" 
               type="button" 
               [class.hidden]="!todo.isEditMode" 
               value="Cancel"
                (click)="setEditState(todo, false)"
                >
  
        </div><!-- col -7 -->
        <div class="col-xs-4">
          <input  (click)="deleteTodo($event, todo)" type="button" class="btn-danger btn pull-right" value="Delete">
          <input [class.disabled]="todo.isCompleted" (click)="setEditState(todo, true)" type="button" class="btn-default btn pull-right" value="Edit">
        </div><!-- col -4 -->
        </div><!-- todo-item FOR -->

    </div><!-- todo-list -->


  `,
})
export class TodosComponent implements OnInit {

  public todos: Todo[];
  constructor(private _todoService: TodoService){}

  ngOnInit(){
    this._todoService.getTodos().subscribe(
        (todos) => {
            this.todos = todos
        };
    )
  };

  addTodo(event, todoText){
    console.log(event, todoText.value);
    var result;
    var newTodo = {
      text: todoText.value,
      isCompleted: false
    };
    result = this._todoService.saveTodo(newTodo);
    result.subscribe(
        res => {
          this.todos.unshift(res);
          todoText.value = null;
        }
    )
  }

  updateStatus(todo){
    var _todo = {
      text: todo.text,
      isCompleted: !todo.isCompleted
    };
    this._todoService.updateTodo(_todo, todo._id).subscribe(
        data => {
          todo.isCompleted = !todo.isCompleted;
          console.log(todo)
        }
    )

  }

  updateTodoText(event, todo){
    if(event.which === 13){
      todo.text = event.target.value;
      var _todo = {
        text: todo.text,
        isCompleted: !todo.isCompleted
      };
      this._todoService.updateTodo(_todo, todo._id).subscribe(
          data => {
            this.setEditState(todo, false)
          }
      )

    }
  }

  setEditState(todo, state){
    if(state){
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  deleteTodo(event, todo){
    console.log(event, todo)
    this._todoService.deleteTodo(todo._id).subscribe(
        data => {
          console.log(data)
          this.todos.splice(this.todos.indexOf(todo), 1)
        }
    )
  }


}