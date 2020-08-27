import { Component, ViewChild } from '@angular/core';
import { Todo } from './todo.model';
import { TodoDataServiceService } from './todo-data-service.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Plugins } from '@capacitor/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Observable, of, concat ,Subscription} from "rxjs";
import {HttpClient} from '@angular/common/http';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('closebutton') closebutton;

  constructor(private todoDataService: TodoDataServiceService, 
              private http: HttpClient,
              private fb: FormBuilder) { 
                this.quickNotes = this.getNotes;
  }

  public ngOnInit():void{
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
  }

  title = 'ToDo App';

  newTodo: Todo = new Todo();
  uploadedFile : File;
  // subscription: Subscription;

  newData:Todo [] =[];
  activeData:Todo [] =[];
  doneData:Todo [] =[];
  quickNotes:string;

  public isNewShow = {};
  public isActiveShow = {};
  public isDoneShow = {};
  public isNewEditable ={};
  public isActiveEditable = {};
  public isDoneEditable = {};


  // creating chart
  doughnutChartLabels: Label[] = ['New Todos', 'Active Todos', 'Done Todos'];
  doughnutChartData: MultiDataSet = [
    [0,0,0]
  ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: any[] = [
    {
      backgroundColor: [
        'rgba(204, 12, 221)',
        'rgba(221, 78, 12)',
        'rgba(165, 221, 12)'
         ]
    }
  ];

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
  }
  updateTodo(todo){
    this.todoDataService.updateTodoById(todo.id, todo.title);
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
  }

  moveToActive(todo){
    
    this.todoDataService.updateTodoById(todo.id, {
      flag: 2
    });
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
  }

  moveToDone(todo){
    this.todoDataService.updateTodoById(todo.id, {
      flag: 3
    });
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
  }

  moveToNew(todo){
    this.todoDataService.updateTodoById(todo.id, {
      flag: 1
    });
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
  }

  clearLocalStorage(){
    this.todoDataService.clearStorage();
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
  }

  addNotes(){
    this.todoDataService.addNotes(this.quickNotes);
  }
 
  get todos() {
    this.newData = this.todoDataService.getNewTodos();
    return this.newData;
  }

  get getNotes():string{
    this.quickNotes = this.todoDataService.getNotes();
    return this.quickNotes;

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


  // Downlaod files
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  dynamicDownloadJson() {
    this.allTodos.subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'MyActivites.json',
        text: JSON.stringify(res)
      });
    });
  }

  private dyanmicDownloadByHtmlTag(arg: {
      fileName: string,
      text: string
    }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    // const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    const fileType = 'text/json' ;
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  //Upload files
  onSelectedFile(event){
    this.uploadedFile = event.target.files[0];
  }

  readFileData(){
    console.log("Reading file data ")
    let fileType = this.uploadedFile.type;
    if(fileType === "application/json"){
      let reader: FileReader = new FileReader();
      reader.readAsText(this.uploadedFile);
      reader.onload = (e) => {
        let fileData : Todo[] = JSON.parse(reader.result as string);
        this.todoDataService.loadTodo(fileData);
        this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
      }
      this.closebutton.nativeElement.click();
    }else{
      console.log("Invalid file format");
      this.closebutton.nativeElement.click();
    }
  }

}

