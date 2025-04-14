# Angular Material Setup

## Date
2023-06-10

## Overview
Implementation of Angular Material in the ng-docmost project with a custom theme based on the primary color `#3b82f6`.

## Implementation Details
1. Installed Angular Material using the Angular CLI
   ```bash
   ng add @angular/material
   ```

2. Generated a custom color theme using the Material Theme Color schematic
   ```bash
   ng generate @angular/material:theme-color
   ```

3. Configured the primary color to be `#3b82f6` while keeping secondary, tertiary, and neutral colors as default

4. Set up typography and density configurations in the theme file

## Technical Decisions
- Chose Material 3 (MDC-based) components over legacy components for better customization options and future support
- Implemented standalone component approach for Angular Material modules to reduce bundle size
- Used the built-in color generation tool instead of manual color palette definition to ensure proper contrast ratios

## Challenges
- Material 3 components required additional CSS adjustments for proper alignment with the design system
- Some form components needed custom styling to match the design mockups
- Typography system required careful configuration to maintain consistent text hierarchy

## Solutions
- Created custom CSS variables to override specific Material component styles
- Established a comprehensive typography scale in the theme file and created utility classes

## Important Notes
- Material theme configuration is centralized in `src/styles/theme.scss`
- Custom component styles should extend, not override, the Material design system
- Remember to use the `mat-` prefix for Material components and the `mc-` prefix for custom components

## Code Snippets
```typescript
// Example of importing Material modules in a standalone component
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Example Component</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        Content goes here
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>OK</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class ExampleComponent {}
```

## Resources
- [Angular Material Documentation](https://material.angular.io/)
- [Material Design 3 Guidelines](https://m3.material.io/)
- [Angular Material Theming Guide](https://material.angular.io/guide/theming)

## Future Improvements
- Create a component showcase page to demonstrate all styled Material components
- Extract common Material module imports into a shared module
- Implement dark mode toggle using Material's built-in color schemes 