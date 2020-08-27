import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { DragDropModule } from '@angular/cdk/drag-drop';
import {HttpClientModule} from '@angular/common/http'
import {MatDividerModule} from '@angular/material/divider';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule,
    DragDropModule,
    HttpClientModule,
    MatDividerModule,
    TextFieldModule,
    MatMenuModule,
    BrowserAnimationsModule,
    
    
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
