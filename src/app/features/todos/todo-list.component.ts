import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { injectTodoService } from './todo-list.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'todo-list',
  template: `
    <todo *ngFor="let todo of todoList$.state$ | async" [todo]="todo"> </todo>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  readonly todoList$ = injectTodoService();

  ngOnInit() {
    this.todoList$.state$
      .pipe(
        finalize(() =>
          console.log(
            'TodoListComponent -> Unsubscribe from state without takeUntil'
          )
        )
      )
      .subscribe();
  }
}
