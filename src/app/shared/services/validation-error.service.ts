import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { signal } from '@angular/core';

/**
 * Interface for validation error message definitions
 */
export interface ValidationErrorDefinition {
  message: string;
  params?: (errors: any) => Record<string, any>;
}

/**
 * Error message configuration type
 */
export type ErrorMessageConfig = Record<string, string | ValidationErrorDefinition>;

@Injectable({
  providedIn: 'root'
})
export class ValidationErrorService {
  /**
   * Default error messages that can be overridden by application
   */
  private defaultErrors = signal<ErrorMessageConfig>({
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minlength: {
      message: 'Minimum length is {requiredLength} characters',
      params: (errors) => ({ 
        requiredLength: errors.requiredLength,
        actualLength: errors.actualLength
      })
    },
    maxlength: {
      message: 'Maximum length is {requiredLength} characters',
      params: (errors) => ({ 
        requiredLength: errors.requiredLength,
        actualLength: errors.actualLength
      })
    },
    pattern: 'The provided value does not match the required pattern',
    passwordMismatch: 'Passwords do not match',
    min: {
      message: 'Value should be at least {min}',
      params: (errors) => ({ min: errors.min })
    },
    max: {
      message: 'Value should be no more than {max}',
      params: (errors) => ({ max: errors.max })
    }
  });

  /**
   * Custom error messages provided by the application
   */
  private customErrors = signal<ErrorMessageConfig>({});

  /**
   * Set custom error messages at the application level
   * @param errors Custom error messages configuration
   */
  setCustomErrors(errors: ErrorMessageConfig): void {
    this.customErrors.set(errors);
  }

  /**
   * Gets the error message for the given validation errors
   * @param errors Validation errors from form control
   * @param customMessages Optional custom messages specific to this control
   * @returns A user-friendly error message
   */
  getErrorMessage(
    errors: ValidationErrors | null, 
    customMessages?: ErrorMessageConfig
  ): string {
    if (!errors) {
      return '';
    }

    // Get the first error key
    const errorKey = Object.keys(errors)[0];
    if (!errorKey) {
      return '';
    }

    // Check for custom message specific to this control
    if (customMessages && (errorKey in customMessages)) {
      return this.formatErrorMessage(errorKey, errors[errorKey], customMessages[errorKey]);
    }

    // Check for global custom errors
    if (errorKey in this.customErrors()) {
      return this.formatErrorMessage(errorKey, errors[errorKey], this.customErrors()[errorKey]);
    }

    // Fall back to default errors
    if (errorKey in this.defaultErrors()) {
      return this.formatErrorMessage(errorKey, errors[errorKey], this.defaultErrors()[errorKey]);
    }

    // If no message is found, return a generic message
    return `Invalid field: ${errorKey}`;
  }

  /**
   * Format the error message, replacing placeholders with actual values
   */
  private formatErrorMessage(
    errorKey: string, 
    errorValue: any, 
    errorDef: string | ValidationErrorDefinition
  ): string {
    // If errorDef is a string, return it directly
    if (typeof errorDef === 'string') {
      return errorDef;
    }

    // Otherwise, it's a ValidationErrorDefinition object
    let message = errorDef.message;
    
    // Replace parameters in the message
    if (errorDef.params) {
      const params = errorDef.params(errorValue);
      
      // Replace each parameter in the message
      Object.entries(params).forEach(([key, value]) => {
        message = message.replace(`{${key}}`, String(value));
      });
    }
    
    return message;
  }
} 