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
import { getActions } from '../../action';
import { injectHold } from '../../shared/hold';
import { injectEverywhere } from '../../shared/inject-everywhere';
import { injectBetterState, injectCreateState } from '../../shared/state';

interface Actions {
  load: void;
}

interface State {
  todos: any[];
  loading: boolean;
}

@Component({
  selector: 'inject-everywhere',
  template: `
  <div>
    <button (click)="state.actions.load()">Reload</button>
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
  readonly state = injectBetterState<State, Actions>(
    {
      todos: [],
      loading: false,
    },
    'markForCheck'
  );

  ngOnInit(): void {
    this.state.hold(this.state.actions.load$, () => this.load());

    this.state.actions.load();
  }

  ngAfterViewInit(): void {
    const lazyFb = injectEverywhere(this, FormBuilder);
    console.log(lazyFb);
  }

  private load(): void {
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
