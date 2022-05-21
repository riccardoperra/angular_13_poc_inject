import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoCdComponent } from './features/auto-cd/auto-cd.component';
import { InjectOutsideConstructorComponent } from './features/inject-outside-constructor/inject-everywhere.component';
import { HelloComponent } from './features/nested/hello.component';
import { TodosComponent } from './features/todos/todos.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'todos', component: TodosComponent },
      { path: 'nested', component: HelloComponent },
      { path: 'auto-cd', component: AutoCdComponent },
      {
        path: 'inject-outside-constructor',
        component: InjectOutsideConstructorComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
