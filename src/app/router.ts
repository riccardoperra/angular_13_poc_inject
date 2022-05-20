import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodosComponent } from './features/todos/todos.component';
import { HelloComponent } from './hello.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'todos', component: TodosComponent },
      { path: 'depth', component: HelloComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
