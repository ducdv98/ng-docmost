import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { ErrorMessageConfig, ValidationErrorService } from '../services/validation-error.service';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Directive({
  selector: '[formControlName], [ngModel], [formControl]',
})
export class FormControlErrorDirective implements OnInit, OnDestroy {
  private errorElement: HTMLDivElement | null = null;
  private subscription = new Subscription();
  private validationErrorService = inject(ValidationErrorService);
  private control: FormControl | null = null;
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  private ngControl = inject(NgControl, { optional: true });

  @Input() customErrorClass = 'input-error';

  /** Custom error messages specific to this form control */
  @Input() customErrors?: ErrorMessageConfig;

  ngOnInit(): void {
    if (!this.ngControl?.control) {
      return;
    }

    this.control = this.ngControl.control as FormControl;

    // Monitor value and validation status changes
    this.subscription.add(
      this.control.statusChanges
        .pipe(startWith(this.control.status))
        .subscribe(() => this.updateErrorMessage()),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.removeErrorElement();
  }

  private updateErrorMessage(): void {
    if (!this.control) return;

    // Remove existing error message if any
    this.removeErrorElement();

    // Only display errors if control is invalid and either dirty or touched
    if (this.control.invalid && (this.control.dirty || this.control.touched)) {
      const errorMessage = this.validationErrorService.getErrorMessage(
        this.control.errors,
        this.customErrors
      );
      if (errorMessage) {
        this.showError(errorMessage);
      }
    }
  }

  private showError(message: string): void {
    // Create error element
    this.errorElement = this.renderer.createElement('div');
    this.renderer.addClass(this.errorElement, this.customErrorClass);
    const text = this.renderer.createText(message);
    this.renderer.appendChild(this.errorElement, text);

    // Insert after the input element
    const parent = this.renderer.parentNode(this.el.nativeElement);
    this.renderer.insertBefore(
      parent,
      this.errorElement,
      this.renderer.nextSibling(this.el.nativeElement),
    );
  }

  private removeErrorElement(): void {
    if (this.errorElement) {
      const parent = this.renderer.parentNode(this.errorElement);
      this.renderer.removeChild(parent, this.errorElement);
      this.errorElement = null;
    }
  }
}
