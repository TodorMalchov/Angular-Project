import { ChangeDetectorRef, Directive, ElementRef, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../user/user.service';

@Directive({
  selector: '[appShowIfAdmin]'
})
export class ShowIfAdminDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.userService.isAdmin$.subscribe((isAdmin) => {
      if (isAdmin) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
