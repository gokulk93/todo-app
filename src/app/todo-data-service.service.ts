import { Injectable } from '@angular/core';
import { Todo } from './todo.model';





@Injectable({
  providedIn: 'root'
})
export class TodoDataServiceService {


  todos: Todo[] =[];
  quickNotes:string;

  

  constructor() {

    if (localStorage.getItem("todo-key") !=null ){
      if(localStorage.getItem("todo-key").length != 0){
        console.log("local storage available");
        this.todos = JSON.parse(localStorage.getItem("todo-key"));
      }else{
        console.log("local storage not availabel");      
      }
    }else{
      console.log("local storage null");      
    }
    if (localStorage.getItem("quick-notes") !=null ){
      if(localStorage.getItem("quick-notes").length != 0){
        console.log("local storage available");
        console.log("Notes::"+localStorage.getItem("quick-notes"));
        this.quickNotes = localStorage.getItem("quick-notes");
      }else{
        console.log("local storage not availabel");      
      }
    }else{
      console.log("local storage null");      
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

  addNotes(note:string){
    this.quickNotes = note;
    localStorage.setItem("quick-notes", this.quickNotes);

  }


  loadTodo(todo: Todo[]){

    console.log("Loading the list");
    this.todos = todo;
    localStorage.setItem("todo-key", JSON.stringify(this.todos));
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

  clearStorage(){
    console.log("Cleared")
    this.todos=[];
    this.quickNotes="";
    localStorage.clear();
  }

  getNotes(){
    return this.quickNotes;
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

  
  getActiveTodos(): Todo[] {
    return this.todos
      .filter(todo => todo.flag === 2);
  }

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
  

}
