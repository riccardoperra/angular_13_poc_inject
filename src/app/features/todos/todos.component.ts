import {
  ChangeDetectionStrategy,
  Component,
  ɵɵdirectiveInject,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { getActions } from '../../action';
import { injectTodoService, TodoListService } from './todo-list.service';
import { TodoService } from './todo.service';

interface Actions {
  add: void;
  delete: string;
}

@Component({
  selector: 'app-todos',
  template: `
    <div class="wrapper">
      <form [formGroup]="form">
        <div>
          <input placeholder="Title" />
        </div>
        <div>
          <textarea placeholder="Body"></textarea>
        </div>
        <button type="submit">Add</button>
      </form>

      <todo-list></todo-list>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoService, TodoListService],
})
export class TodosComponent {
  private readonly fb = ɵɵdirectiveInject(FormBuilder);
  readonly todoService = injectTodoService();
  readonly actions = getActions<Actions>();

  readonly form = this.fb.group({
    title: this.fb.control(''),
    body: this.fb.control(''),
  });

  ngOnInit(): void {}
}
