import {
  ChangeDetectionStrategy,
  Component,
  Input,
  VERSION,
} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  @Input()
  depth: number = 0;

  @Input()
  showForm = true;
}
