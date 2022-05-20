import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ɵɵdirectiveInject,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { getActions } from './action';

@Component({
  selector: 'hello',
  template: `
    <div class="content">
      <input type="text" [formControl]="control" />
      <button [disabled]="control.invalid" (click)="actions.add(control.value)">Add</button>

      <div *ngFor="let item of list$ | async" class="item">
       {{item}} -  <button (click)="actions.delete(item)">Delete</button>
      </div>

    </div>

      <hr/>

     <my-app 
        [depth]="depth + 1"
        [showForm]="false">
      </my-app>

  
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
  @Input() name: string;
  @Input() depth: number = 0;

  readonly list$ = new BehaviorSubject<string[]>([]);

  readonly control = ɵɵdirectiveInject(FormBuilder).control(
    '',
    Validators.required
  );

  actions = getActions<{
    add: string;
    delete: string;
  }>();

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
