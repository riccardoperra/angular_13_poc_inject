import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  VERSION,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { delay, finalize } from 'rxjs/operators';
import { injectEverywhere } from '../../shared/inject-everywhere';
import { injectCreateState } from '../../shared/state';

@Component({
  selector: 'inject-everywhere',
  template: `
  <div>
    <button (click)="load()">Reload</button>
   </div>

  <div *ngIf="state.loading; else content">Loading...</div>
  <ng-template #content>  
    {{ state.todos | json }}
  </ng-template>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InjectOutsideConstructorComponent
  implements OnInit, AfterViewInit
{
  readonly state = injectCreateState(
    {
      todos: [],
      loading: false,
    },
    'markForCheck'
  );

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit(): void {
    const lazyFb = injectEverywhere(this, FormBuilder);
    console.log(lazyFb);
  }

  load(): void {
    const lazyHttp = injectEverywhere(this, HttpClient);
    this.state.loading = true;
    lazyHttp
      .get<any[]>('https://jsonplaceholder.typicode.com/todos?_limit=3')
      .pipe(
        delay(1000),
        finalize(() => (this.state.loading = false))
      )
      .subscribe((todos) => (this.state.todos = todos));
  }
}
