import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  VERSION,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { injectEverywhere } from './shared/inject-everywhere';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  name = 'Angular ' + VERSION.major;

  ngOnInit(): void {
    const lazyHttp = injectEverywhere(this, HttpClient);
    console.log(lazyHttp);
  }

  ngAfterViewInit(): void {
    const lazyFb = injectEverywhere(this, FormBuilder);
    console.log(lazyFb);
  }
}
