import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';

import { CalculatorService } from './services/calculator/calculator.service';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/data/in-memory-data.service';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [ AppComponent, CalculatorComponent ],
  providers: [ CalculatorService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }