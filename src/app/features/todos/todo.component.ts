import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { getActions } from '../../action';
import { injectTodoService } from './todo-list.service';
import { Todo } from './todo.service';

interface TodoActions {
  delete: void;
}

@Component({
  selector: 'todo',
  template: `
    <div class="wrapper">
      <h1>
        {{todo?.title || 'No title'}}
      </h1>
      <h3>{{todo?.body || 'No body'}}</h3>

      <h5>Id: {{todo.id}}</h5>

      <button (click)="actions$.delete()">Delete</button>
    </div>
  `,
  styles: [
    `
      .wrapper {
        border: 1px solid red;
        padding: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  readonly service = injectTodoService();
  readonly actions$ = getActions<TodoActions>();

  @Input()
  todo: Todo | null = null;

  ngOnInit(): void {
    this.actions$.delete$.subscribe(() => {
      this.service.removeTodo(this.todo!.id as number);
    });
  }
}
