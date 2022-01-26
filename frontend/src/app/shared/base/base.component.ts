import { Component, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs'

@Component({
  template: ''
})
export class BaseComponent implements OnDestroy {
  ngUnsubscribe = new ReplaySubject<void>(1)

  ngOnDestroy() {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }
}
