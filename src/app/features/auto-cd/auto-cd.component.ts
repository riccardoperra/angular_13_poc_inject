import { ChangeDetectionStrategy, Component } from '@angular/core';
import { injectCreateState } from '../../shared/state';

@Component({
  selector: 'auto-cd-example',
  template: `
    <h1>Counter - Auto CD</h1>
    <div>{{ state.counter }}</div>
    <div>
      <button (click)="state.counter = 0">RESET</button>
      <button (click)="increment()">+</button>
    </div>

    <hr/>

    <h1>Counter - Default (Will not work)</h1>
    <div>{{ stateBasic.counter }}</div>
    <div>
      <button (click)="stateBasic.counter = 0">RESET</button>
      <button (click)="incrementBasic()">+</button>
    </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCdComponent {
  stateBasic = {
    counter: 0,
  };

  state = injectCreateState({
    counter: 0,
  });

  increment() {
    setTimeout(() => {
      ++this.state.counter;
    }, 250);
  }

  incrementBasic() {
    setTimeout(() => {
      ++this.stateBasic.counter;
    }, 250);
  }
}
