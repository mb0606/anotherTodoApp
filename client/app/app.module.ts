import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {TodosComponent} from "./components/todo.component";
import {NavbarComponent} from "./components/navbar.component";
import {TodoService} from "./services/todo.service";
import {HttpModule} from "@angular/http";

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule],
  declarations: [ AppComponent,
                  TodosComponent,
                  NavbarComponent
                ],
  providers:    [ TodoService ]
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
