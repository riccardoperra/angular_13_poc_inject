import {
  Injectable,
  InjectFlags,
  OnInit,
  ɵɵdirectiveInject,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { IdentifierService } from '../../shared/id.service';
import { injectOnDestroy$ } from '../../action';

@Injectable()
export class TodoListService {
  readonly state$ = new BehaviorSubject<readonly Todo[]>([]);
  readonly destroy$ = injectOnDestroy$();
  httpClient = ɵɵdirectiveInject(HttpClient);
  idService = ɵɵdirectiveInject(IdentifierService);

  constructor() {
    this.destroy$.subscribe(() => this.state$.complete());
  }

  addTodo(todo: Pick<Todo, 'title' | 'body'>) {
    this.state$.next([
      ...this.state$.value,
      { ...todo, id: this.idService.next(), userId: 1 },
    ]);
  }

  removeTodo(id: number) {
    this.state$.next(this.state$.value.filter((todo) => todo.id !== id));
  }

  loadFromServer(): Observable<readonly Todo[]> {
    return this.httpClient.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos?userId=1&_limit=5'
    );
  }

  reload(): void {
    this.loadFromServer().subscribe((response) => this.state$.next(response));
  }
}

export function injectTodoService() {
  const service = ɵɵdirectiveInject(TodoListService, InjectFlags.Optional);
  if (!service) {
    return new TodoListService();
  }
  return service;
}
