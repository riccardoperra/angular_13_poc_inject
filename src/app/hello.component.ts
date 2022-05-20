import {
  ChangeDetectionStrategy,
  Component,
  InjectFlags,
  InjectionToken,
  Input,
  OnInit,
  Optional,
  SkipSelf,
  ɵɵdirectiveInject,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { getActions } from './action';

const PARENT_HELLO_COMPONENT = new InjectionToken<HelloComponent>(
  'Parent component'
);

function provideParentHelloComponent() {
  return {
    provide: PARENT_HELLO_COMPONENT,
    useFactory: (cmp: HelloComponent) => cmp,
    deps: [[HelloComponent, new SkipSelf(), new Optional()]],
  };
}

export const injectParentHelloComponent = () => {
  return ɵɵdirectiveInject(PARENT_HELLO_COMPONENT);
};

@Component({
  selector: 'hello',
  template: `
  
    <div class="content">
      <h3 *ngIf="parent; else noParent">My parent is {{parent.name}}</h3>
      <ng-template #noParent>I don't have a parent</ng-template>

      <input type="text" [formControl]="control" />
      <button [disabled]="control.invalid" (click)="actions.add(control.value)">Add</button>

      <div *ngFor="let item of list$ | async" class="item">
       {{item}} -  <button (click)="actions.delete(item)">Delete</button>
      </div>

    </div>

    <hr/>

    
    <button (click)="show = !show">{{showHideLabel}}</button>
     <hello
      *ngIf="show"
      [depth]="depth + 1"
      [name]="name"
      [show]="false">
    </hello>
  `,
  styles: [
    `
    h1 { font-family: Lato; }

    .content { 
      border: 1px solid blue;
      padding: 1rem;
    }

    .item {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

  `,
  ],
  providers: [provideParentHelloComponent()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloComponent implements OnInit {
  @Input() name: string;
  @Input() depth: number = 0;
  @Input() show = false;

  readonly list$ = new BehaviorSubject<string[]>([]);

  readonly control = ɵɵdirectiveInject(FormBuilder).control(
    '',
    Validators.required
  );

  readonly parent = ɵɵdirectiveInject(PARENT_HELLO_COMPONENT);

  readonly actions = getActions<{
    add: string;
    delete: string;
  }>();

  get showHideLabel() {
    return `${this.show ? 'Hide' : 'Show'} ${this.depth}`;
  }

  get name(): string {
    return 'Hello component with depth: '  this.depth;
  }

  ngOnInit(): void {
    this.actions.add$
      .pipe(
        tap(() => this.control.reset('')),
        finalize(() => console.log('Destroy add$', this.depth))
      )
      .subscribe((el) => this.list$.next([...this.list$.value, el]));

    this.actions.delete$
      .pipe(finalize(() => console.log('Destroy delete$', this.depth)))
      .subscribe((itemToDelete) =>
        this.list$.next(
          this.list$.value.filter((item) => itemToDelete !== item)
        )
      );
  }
}
