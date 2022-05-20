import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoCdComponent } from './features/auto-cd/auto-cd.component';
import { TodosComponent } from './features/todos/todos.component';
import { HelloComponent } from './hello.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'todos', component: TodosComponent },
      { path: 'depth', component: HelloComponent },
      { path: 'auto-cd', component: AutoCdComponent }
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
