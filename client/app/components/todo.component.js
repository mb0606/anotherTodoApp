"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var todo_service_1 = require("../services/todo.service");
var TodosComponent = (function () {
    function TodosComponent(_todoService) {
        this._todoService = _todoService;
    }
    TodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._todoService.getTodos().subscribe(function (todos) {
            _this.todos = todos;
        });
    };
    ;
    TodosComponent.prototype.addTodo = function (event, todoText) {
        var _this = this;
        console.log(event, todoText.value);
        var result;
        var newTodo = {
            text: todoText.value,
            isCompleted: false
        };
        result = this._todoService.saveTodo(newTodo);
        result.subscribe(function (res) {
            _this.todos.unshift(res);
            todoText.value = null;
        });
    };
    TodosComponent.prototype.updateStatus = function (todo) {
        var _todo = {
            text: todo.text,
            isCompleted: !todo.isCompleted
        };
        this._todoService.updateTodo(_todo, todo._id).subscribe(function (data) {
            todo.isCompleted = !todo.isCompleted;
            console.log(todo);
        });
    };
    TodosComponent.prototype.updateTodoText = function (event, todo) {
        var _this = this;
        if (event.which === 13) {
            todo.text = event.target.value;
            var _todo = {
                text: todo.text,
                isCompleted: !todo.isCompleted
            };
            this._todoService.updateTodo(_todo, todo._id).subscribe(function (data) {
                _this.setEditState(todo, false);
            });
        }
    };
    TodosComponent.prototype.setEditState = function (todo, state) {
        if (state) {
            todo.isEditMode = state;
        }
        else {
            delete todo.isEditMode;
        }
    };
    TodosComponent.prototype.deleteTodo = function (event, todo) {
        var _this = this;
        console.log(event, todo);
        this._todoService.deleteTodo(todo._id).subscribe(function (data) {
            console.log(data);
            _this.todos.splice(_this.todos.indexOf(todo), 1);
        });
    };
    return TodosComponent;
}());
TodosComponent = __decorate([
    core_1.Component({
        selector: 'my-todos',
        template: "\n    <div class=\"add-todo-form text-center\">\n      <h1>Add Todo</h1>\n      <div class=\"form-group\">\n        <input  type=\"text\" \n                class=\"form-control input-lg\" \n                placeholder=\"Add Todo\" \n                autofocus \n                #todoText\n                required>\n                <br>\n        <button (click)=\"addTodo($event, todoText);\" class=\"btn btn-primary btn-block\">Create</button>\n      </div><!-- form group -->  \n    </div><!-- add todo -->\n    \n    <div class=\"todo-list\">\n        <div class=\"row\" *ngFor=\"let todo of todos\">\n        <div class=\"col-md-1\">\n          <input type=\"checkbox\" [checked]=\"todo.isCompleted\" (click)=\"updateStatus(todo)\">\n        </div><!-- col -1 -->\n        <div class=\"col-md-7\">\n        <span (click)=\"setEditState(todo, true)\" [class.hidden]=\"todo.isEditMode\" \n        [class.done]=\"todo.isCompleted\">{{todo.text}}</span>\n        <input type=\"text\" \n               [class.hidden]=\"!todo.isEditMode\" \n               [value]=\"todo.text\"\n               (keypress)=\"updateTodoText($event, todo)\"\n               >\n         <input \n               class=\"btn btn-warning\" \n               type=\"button\" \n               [class.hidden]=\"!todo.isEditMode\" \n               value=\"Cancel\"\n                (click)=\"setEditState(todo, false)\"\n                >\n  \n        </div><!-- col -7 -->\n        <div class=\"col-md-4\">\n          <input  (click)=\"deleteTodo($event, todo)\" type=\"button\" class=\"btn-danger btn pull-right\" value=\"Delete\">\n          <input [class.disabled]=\"todo.isCompleted\" (click)=\"setEditState(todo, true)\" type=\"button\" class=\"btn-default btn pull-right\" value=\"Edit\">\n        </div><!-- col -4 -->\n        </div><!-- todo-item FOR -->\n\n    </div><!-- todo-list -->\n\n\n  ",
    }),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodosComponent);
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todo.component.js.map