import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Todo {
  userId: number;
  id: number | string;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly baseHref = 'https://jsonplaceholder.typicode.com';
  readonly httpClient = inject(HttpClient);

  getAll(): Observable<readonly Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.baseHref}/todo?userId=1`);
  }
}
