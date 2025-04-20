import { Injectable, inject } from '@angular/core';
import { ErrorMessageConfig, ValidationErrorService } from './validation-error.service';

/**
 * This is a demonstration service showing how you would integrate
 * the validation error system with a translation service.
 * In a real application, you would inject your actual translation service.
 */
@Injectable({
  providedIn: 'root'
})
export class ValidationTranslationService {
  private validationErrorService = inject(ValidationErrorService);
  
  /**
   * Initialize translated validation error messages
   * Call this method during app initialization to set up translations
   */
  initTranslations(): void {
    // This would typically be integrated with your translation service
    // For demonstration, we're using hardcoded translations here
    
    const translatedErrors: ErrorMessageConfig = {
      required: {
        message: 'validation.required',
        params: () => ({})
      },
      email: {
        message: 'validation.email',
        params: () => ({})
      },
      minlength: {
        message: 'validation.minlength',
        params: (errors) => ({ 
          requiredLength: errors.requiredLength,
          actualLength: errors.actualLength
        })
      },
      maxlength: {
        message: 'validation.maxlength',
        params: (errors) => ({ 
          requiredLength: errors.requiredLength,
          actualLength: errors.actualLength
        })
      }
      // Add more translated errors as needed
    };
    
    // Set the translated errors in the validation service
    this.validationErrorService.setCustomErrors(translatedErrors);
  }
  
  /**
   * In a real implementation, this might be integrated with your
   * translation service to translate the error key and its parameters.
   * 
   * Example implementation with ngx-translate:
   * 
   * translateError(key: string, params: Record<string, any>): string {
   *   return this.translateService.instant(key, params);
   * }
   */
  translateError(key: string, params: Record<string, any> = {}): string {
    // Simulated translation method - in a real app, this would use your translation service
    switch (key) {
      case 'validation.required':
        return 'This field is required';
      case 'validation.email':
        return 'Please enter a valid email address';
      case 'validation.minlength':
        return `Minimum length is ${params['requiredLength']} characters (currently ${params['actualLength']})`;
      case 'validation.maxlength':
        return `Maximum length is ${params['requiredLength']} characters (currently ${params['actualLength']})`;
      default:
        return key;
    }
  }
} 