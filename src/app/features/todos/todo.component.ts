import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getActions } from '../../action';
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
export class TodoComponent {
  readonly actions$ = getActions<TodoActions>();

  @Input()
  todo: Todo | null = null;
}
