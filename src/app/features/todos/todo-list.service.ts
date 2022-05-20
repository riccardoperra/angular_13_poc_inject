import { inject, Injectable, InjectFlags } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { IdentifierService } from '../../shared/id.service';

@Injectable()
export class TodoListService {
  readonly state$ = new BehaviorSubject<Todo[]>([]);

  idService = inject(IdentifierService);

  constructor() {}

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
    return inject(HttpClient).get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todo?userId=1'
    );
  }
}

export function injectTodoService() {
  const service = inject(TodoListService, InjectFlags.Optional);
  if (!service) {
    return new TodoListService();
  }
  return service;
}
