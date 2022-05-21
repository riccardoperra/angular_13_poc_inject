import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoCdComponent } from './features/auto-cd/auto-cd.component';
import { InjectOutsideConstructorComponent } from './features/inject-outside-constructor/inject-everywhere.component';
import { TodosComponent } from './features/todos/todos.component';
import { HelloComponent } from './hello.component';
import { injectEverywhere } from './shared/inject-everywhere';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'todos', component: TodosComponent },
      { path: 'depth', component: HelloComponent },
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
