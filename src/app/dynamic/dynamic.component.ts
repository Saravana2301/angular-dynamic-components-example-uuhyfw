import {
  Component,
  ViewChild,
  OnInit,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  OnDestroy,
} from '@angular/core';
import { CdkPortal, DomPortalHost } from '@angular/cdk/portal';

/**
 * This component template wrap the projected content
 * with a 'cdkPortal'.
 */

@Component({
  selector: 'window',
  template: `
    <ng-container *cdkPortal>
      <h2>Hello world from another window!!</h2>
    </ng-container>
  `,
})
export class DynamicComponent implements OnInit, OnDestroy {
  // STEP 1: get a reference to the portal
  @ViewChild(CdkPortal)
  portal!: CdkPortal;

  // STEP 2: save a reference to the window so we can close it
  private externalWindow: any;

  // STEP 3: Inject all the required dependencies for a PortalHost
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {}

  ngOnInit() {
    // STEP 4: create an external window
    this.externalWindow = window.open(
      '',
      '',
      'width=600,height=400,left=200,top=200'
    );

    // STEP 5: create a PortalHost with the body of the new window document
    const host = new DomPortalHost(
      this.externalWindow.document.body,
      this.componentFactoryResolver,
      this.applicationRef,
      this.injector
    );

    // STEP 6: Attach the portal
    host.attach(this.portal);
  }

  ngOnDestroy() {
    // STEP 7: close the window when this component destroyed
    if (this.externalWindow != null) {
      this.externalWindow.close();
    }
  }
}
