import { Injectable } from '@angular/core';
import { Todo } from './todo.model';





@Injectable({
  providedIn: 'root'
})
export class TodoDataServiceService {


  todos: Todo[] =[];
  quickNotes:string | undefined;


  

  constructor() {

    if (localStorage.getItem("todo-key") !=null ){
      if(localStorage.getItem("todo-key").length != 0){
        this.todos = JSON.parse(localStorage.getItem("todo-key"));
      }else{
        console.log("local storage not availabel");      
      }
    }else{
      console.log("local storage is empty");      
    }
    if (localStorage.getItem("quick-notes") !=null ){
      if(localStorage.getItem("quick-notes").length != 0){
        this.quickNotes = localStorage.getItem("quick-notes");
      }else{
        console.log("local storage not availabel");      
      }
    }else{
      console.log("local storage is empty");      
    }
   }

  public ngOnInit():void{

  }

  // Simulate POST /todos
  addTodo(todo: Todo): TodoDataServiceService {
    if (!todo.id) {
      todo.id = this.getLastGeneratedId();
    }

    if(this.todos.filter(item => item.title === todo.title).length > 0 || todo.title === ""){
      return this;
    }else{
      this.todos.push(todo);
      localStorage.setItem("todo-key", JSON.stringify(this.todos));
    }
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoDataServiceService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    localStorage.setItem("todo-key", JSON.stringify(this.todos));
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    console.log(values.toString);
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    localStorage.setItem("todo-key", JSON.stringify(this.todos));

    return todo;
  }

  // Simulate GET /quickNotes
  getNotes(){
    return this.quickNotes;
  }

  // return all the todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // return all the defined/new todos
  getNewTodos(): Todo[] {
    return this.todos
    .filter(todo => todo.flag === 1);
  }

  // return todo by id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }


  // return all the active todos
  getActiveTodos(): Todo[] {
    return this.todos
      .filter(todo => todo.flag === 2);
  }

  // return all completed todos
  getCompletedTodos(): Todo[] {
    return this.todos
      .filter(todo => todo.flag === 3);
  }


  getLastGeneratedId():number{
    if (localStorage.getItem("todo-key") !=null ){
      if(localStorage.getItem("todo-key").length != 0){

        var temp = JSON.parse(localStorage.getItem("todo-key"));
        var ids:number[]=[];

        for(var i=0; i<temp.length;i++){
          ids[i] = temp[i].id;
        }
        
        var max = Math.max.apply(Math,ids);
        
        return max+1;
      }
    }else{
      return 1;
    }
  }



  loadNotes(note:string){
    this.quickNotes = note;
    localStorage.setItem("quick-notes", this.quickNotes);
  }

  loadTodo(todo: Todo[]){
    this.todos = todo;
    localStorage.setItem("todo-key", JSON.stringify(this.todos));
  }

  clearStorage(){
    this.todos=[];
    this.quickNotes="";
    localStorage.clear();
  }
  

}
