import { Component, ViewChild } from '@angular/core';
import { TodoDataServiceService } from './todo-data-service.service';
import { Todo } from './todo.model';
import * as fileSaver from 'file-saver';
import { TodoComponent } from './todo/todo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(TodoComponent,{ static: true}) todoComp: TodoComponent;

  title = 'IdeasGo';

  @ViewChild('closebutton') closebutton;

  quickNotes: string;

  constructor(private todoService : TodoDataServiceService){
    this.quickNotes = this.getNotes;
    
  }

  jsonDownload(){
    let json = JSON.stringify(this.todoService.getAllTodos());
    let blob = new Blob([json], { type: 'text/json; charset=utf-8' });
    fileSaver.saveAs(blob, 'MyTasks.json');
  }

  uploadedFile : any;

  //Upload files
  onSelectedFile(event){
    this.uploadedFile = event.target.files[0];
  }

  readFileData(){
    console.log("Reading file data")
    let fileType = this.uploadedFile.type;
    if(fileType === "application/json"){
      let reader: FileReader = new FileReader();
      reader.readAsText(this.uploadedFile);
      reader.onload = (e) => {
        let fileData : Todo[] = JSON.parse(reader.result as string);
        this.todoService.loadTodo(fileData);
        // this.doughnutChartData =[[this.todos.length,this.activeTodos.length,this.completedTodos.length]];
      }
      this.closebutton.nativeElement.click();

      window.location.reload();

    }else{
      console.log("Invalid file format");
      this.closebutton.nativeElement.click();
    }
  }

  clearData(){
    this.todoService.clearStorage();
  }


  addNotes(){
    this.todoService.loadNotes(this.quickNotes);
  }


  get getNotes():string{
    this.quickNotes = this.todoService.getNotes();
    return this.quickNotes;

  }
  
  
}

