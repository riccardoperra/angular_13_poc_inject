import {
  ChangeDetectionStrategy,
  Component,
  InjectFlags,
  Input,
  OnInit,
  ɵɵdirectiveInject,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { getActions } from '../../action';

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

      <hr/>

    
      <button (click)="show = !show">{{showHideLabel}}</button>
         <hello
          *ngIf="show"
          [depth]="depth + 1"
          [name]="computedLabel"
          [show]="false">
        </hello>
      </div>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloComponent implements OnInit {
  @Input() name: string = 'The component with no parent';
  @Input() depth: number = 0;
  @Input() show = false;

  readonly actions = getActions<{
    add: string;
    delete: string;
  }>();

  readonly list$ = new BehaviorSubject<string[]>([]);

  readonly control = ɵɵdirectiveInject(FormBuilder).control(
    '',
    Validators.required
  );

  readonly parent = ɵɵdirectiveInject(
    HelloComponent,
    InjectFlags.SkipSelf | InjectFlags.Optional
  );

  get showHideLabel() {
    return `${this.show ? 'Hide' : 'Show'} ${this.depth}`;
  }

  get computedLabel(): string {
    return 'Hello component with depth: ' + this.depth;
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
