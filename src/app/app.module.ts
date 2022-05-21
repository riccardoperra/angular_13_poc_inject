import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodosModule } from './features/todos/todos.module';
import { AppRoutingModule } from './router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InjectOutsideConstructorComponent } from './features/inject-outside-constructor/inject-everywhere.component';
import { HelloComponent } from './features/nested/hello.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    TodosModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    InjectOutsideConstructorComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
