import { Component } from '@angular/core';
import { Todo } from './todo.model';
import { TodoDataServiceService } from './todo-data-service.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Plugins } from '@capacitor/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  

  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataServiceService) { }

  public ngOnInit():void{
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];

  }
  title = 'todo-app';



  doughnutChartLabels: Label[] = ['New Todos', 'Active Todos', 'Done Todos'];
  doughnutChartData: MultiDataSet = [
    [0,0,0]
  ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: any[] = [
    {
      backgroundColor: [
        'rgba(156, 39, 176, 0.7)',
         'rgba(3, 169, 244, 0.7)',
         'rgba(76, 175, 80, 0.7)'
         ]
    }
  ];

  
  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
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
  clearLocalStorage(){
    this.todoDataService.clearStorage();
    this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
    
  }

  get todos() {
    return this.todoDataService.getNewTodos();
  }

  get activeTodos(){
    return this.todoDataService.getActiveTodos();
  }

  get completedTodos(){
    return this.todoDataService.getCompletedTodos();
  }
  get allTodos(){
    return this.todoDataService.getAllTodos();
  }

}
