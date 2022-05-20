import {
  ChangeDetectionStrategy,
  Component,
  ɵɵdirectiveInject,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { getActions } from '../../action';
import { withIdentifier } from '../../shared/id.service';
import { injectTodoService, TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todos',
  template: `
    <div class="wrapper">
      <button (click)="todoService.reload()">Reload</button>

      <form [formGroup]="form" (ngSubmit)="ui.submit()">
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
  providers: [withIdentifier('todo'), TodoListService],
})
export class TodosComponent {
  private readonly fb = ɵɵdirectiveInject(FormBuilder);
  readonly ui = getActions<{ submit: void }>();

  readonly todoService = injectTodoService();

  readonly form = this.fb.group({
    title: this.fb.control(''),
    body: this.fb.control(''),
  });

  ngOnInit(): void {
    this.ui.submit$.subscribe(() => {
      this.todoService.addTodo({
        title: this.form.value.title,
        body: this.form.value.body,
      });
    });
  }
}
