import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class TodoDataServiceService {

  constructor(private cookieService: CookieService) { }
  private cookieeValue:string;
  cookieExists:boolean;

  public ngOnInit():void{
    this.cookieExists = this.cookieService.check('todos');
    if(this.cookieExists){
      this.getCookies;
    }else{
      this.storeCookies;
    }

  }


  // Placeholder for last id so we can simulate
  // automatic incrementing of ids
  lastId: number = 0;

  // Placeholder for todos
  todos: Todo[] = [];


  

  // Simulate POST /todos
  addTodo(todo: Todo): TodoDataServiceService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    if(this.todos.filter(item => item.title === todo.title).length > 0 || todo.title === ""){
      return this;
    }else{
      this.todos.push(todo);
    }
    this.storeCookies();
    return this;
  }


  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoDataServiceService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    
    return this;
  }


  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    
    return todo;
  }


  // Simulate GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // Simulate GET /todos
  getNewTodos(): Todo[] {
    
    return this.todos
    .filter(todo => todo.flag === 1);
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }
  
  getActiveTodos(): Todo[] {
    
    return this.todos
      .filter(todo => todo.flag === 2);
  }

  getCompletedTodos(): Todo[] {
   
    return this.todos
      .filter(todo => todo.flag === 3);
  }


  storeCookies(){
    
    this.cookieService.set("todos",JSON.stringify(this.getAllTodos));
    
  }
  getCookies(){
    if(this.cookieExists){
      this.todos = JSON.parse(this.cookieService.get("todos"));
    }
  }

}
