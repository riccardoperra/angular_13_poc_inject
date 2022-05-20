import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ɵɵdirectiveInject,
} from '@angular/core';
import { injectCreateState } from '../../shared/state';

// Detach Angular component from view --> ui will be updated only with cd.detectChanges()
function detachView<T extends { new (...args: any[]): {} }>(constructor: T) {
  // @ts-expect-error
  return class extends constructor {
    constructor() {
      super();
      const changeDetectorRef = ɵɵdirectiveInject(ChangeDetectorRef);
      changeDetectorRef.detach();
    }
  };
}

@Component({
  selector: 'auto-cd-example',
  template: `
    <h1>Counter - Auto CD</h1>
    <div>{{ state.counter }}</div>
    <div>
      <button (click)="reset()">RESET</button>
      <button (click)="increment()">+</button>
    </div>

    <hr/>

    <h1>Counter - Default (Will not work)</h1>
    <div>{{ stateBasic.counter }}</div>
    <div>
      <button (click)="resetBasic()">RESET</button>
      <button (click)="incrementBasic()">+</button>
    </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@detachView
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
    }, 500);
  }

  reset() {
    setTimeout(() => {
      this.state.counter = 0;
    }, 500);
  }

  resetBasic() {
    setTimeout(() => {
      this.stateBasic.counter = 0;
    }, 500);
  }

  incrementBasic() {
    setTimeout(() => {
      ++this.stateBasic.counter;
    }, 500);
  }
}
