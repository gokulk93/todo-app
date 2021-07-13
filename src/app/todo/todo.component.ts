import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoDataServiceService } from '../todo-data-service.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{



  constructor(private todoDataService: TodoDataServiceService, 
              private http: HttpClient,
              private fb: FormBuilder) { 
                this.checkForLength();
                this.checkDataCount();
  }

  public ngOnInit():void{
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
  }
  

  ngAfterContentChecked() {
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
    this.checkForLength();

  }

  totalCount : number=0;
  emptyData : boolean = true;

  checkDataCount(){
    this.totalCount = this.todos.length+this.activeTodos.length+this.completedTodos.length;

    if(this.totalCount == 0 )
      this.emptyData = true;
    else
      this.emptyData = false;

  }

  checkForLength(){
    if (this.newData.length == 0){
      this.isNewEmpty=true;
    }else{
      this.isNewEmpty=false;
    }
    if (this.activeData.length == 0){
      this.isActiveEmpty=true;
    }else{
      this.isActiveEmpty=false;
    }
    if (this.doneData.length == 0){
      this.isDoneEmpty=true;
    }else{
      this.isDoneEmpty=false;
    }
  }

  isNewEmpty : boolean = true;
  isActiveEmpty : boolean = true;
  isDoneEmpty : boolean = true;


  newTodo: Todo = new Todo();
  uploadedFile : File;
  // subscription: Subscription;

  newData:Todo [] =[];
  activeData:Todo [] =[];
  doneData:Todo [] =[];


  public isNewShow = {};
  public isActiveShow = {};
  public isDoneShow = {};
  public isNewEditable ={};
  public isActiveEditable = {};
  public isDoneEditable = {};


  // creating chart
  doughnutChartLabels: Label[] = ['New Tasks', 'Progressive Tasks', 'Completed Tasks'];
  doughnutChartData: MultiDataSet = [
    [0,0,0]
  ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: any[] = [
    {
      backgroundColor: [
        '#98DBC6',
        '#DFE166',
        '#3F681C'
         ]
    }
  ];





  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
    this.checkDataCount();

  }
  updateTodo(todo){
    this.todoDataService.updateTodoById(todo.id, todo.title);
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
    this.checkDataCount();
  }

  removeTodo(todo) {
    
    this.todoDataService.deleteTodoById(todo.id);
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
    this.checkForLength();
    this.checkDataCount();
  }

  moveToActive(todo){
    this.todoDataService.updateTodoById(todo.id, {
      flag: 2
    });
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
    this.checkForLength();
    this.checkDataCount();
  }

  moveToDone(todo){
    this.todoDataService.updateTodoById(todo.id, {
      flag: 3
    });
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
    this.checkForLength();
    this.checkDataCount();
  }

  moveToNew(todo){
    this.todoDataService.updateTodoById(todo.id, {
      flag: 1
    });
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
    this.checkForLength();
    this.checkDataCount();
  }

  // clearLocalStorage(){
     
  //   this.todoDataService.clearStorage();
  //   this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
  //   this.checkForLength();
  //   this.checkDataCount();
  // }
 
  get todos() {
    this.newData = this.todoDataService.getNewTodos();
    return this.newData;
  }


  get activeTodos(){
    this.activeData = this.todoDataService.getActiveTodos();
    return this.activeData;
  }

  get completedTodos(){
    this.doneData = this.todoDataService.getCompletedTodos();
    return this.doneData;
  }

  get allTodos(){
    return of(this.todoDataService.getAllTodos());
  }

// Drang and Drop Events
  drop(event: CdkDragDrop<string[]>) {
    console.log("event: ", event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      let selectedObjIndex:number = event.previousIndex;

      let todoObj:Todo = event.previousContainer.data[selectedObjIndex] as Object as Todo;
      
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      
      if(event.container.id === 'cdk-drop-list-0'){
        this.moveToNew(todoObj);
      }else if(event.container.id === 'cdk-drop-list-1'){
        this.moveToActive(todoObj);
      }else{
        this.moveToDone(todoObj);
      }
    }
  }

}
