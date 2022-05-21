import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  readonly links = [
    {
      title: `Example using a shared service between component, getAction helper and auto unsubscribe`,
      name: 'With shared service',
      href: '/todos',
    },
    {
      title: `Example using nested providers and custom InjectFlags`,
      name: 'Nested providers',
      href: '/nested',
    },
    {
      title: `Example using decorators, tracking change detection automatically in a component with detached view`,
      name: 'Auto-track change detection with OnPush + detached view',
      href: '/auto-cd',
    },
    {
      title: `Example injecting dependencies outside constructor`,
      name: 'Inject outside constructor',
      href: '/inject-outside-constructor',
    },
  ];
}
