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

/**
 *
 * Managing observable state using proxies and change detection triggered automatically
 *
 */
@Component({
  selector: 'auto-cd-example',
  template: `
    <h1>Counter - Handling change detection automatically </h1>
    <div>{{ state.counter }}</div>
    <div>
      <button (click)="resetWithCd()">RESET</button>
      <button (click)="incrementWithCd()">+</button>
    </div>

    <hr/>

    <h1>Counter - Default (Will not update UI automatically)</h1>
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

  state = injectCreateState(
    {
      counter: 0,
    },
    // Can be markForCheck if view is not detached --> remove @detachView from component metadata
    'detectChanges'
  );

  incrementWithCd() {
    setTimeout(() => {
      ++this.state.counter;
    }, 500);
  }

  resetWithCd() {
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
