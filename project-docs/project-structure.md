ng-docmost/
├── angular.json                 # Angular CLI workspace configuration
├── node_modules/                # Project dependencies (managed by npm/pnpm/yarn)
├── package.json                 # Project metadata and dependencies
├── tailwind.config.js           # Tailwind CSS configuration
├── .postcssrc.json              # PostCSS configuration (often used with Tailwind)
├── tsconfig.json                # Base TypeScript configuration
├── tsconfig.app.json            # App-specific TypeScript configuration
├── tsconfig.spec.json           # Test-specific TypeScript configuration
├── .eslintrc.json               # ESLint configuration
├── .prettierrc.json             # Prettier configuration
├── .editorconfig                # Editor configuration consistency
├── README.md                    # Project documentation (as created earlier)
├── src/                         # Source files for the application
│   ├── main.ts                  # Main application bootstrap point
│   ├── index.html               # Root HTML file
│   ├── styles.scss              # Global styles: imports for Tailwind base/components/utilities, Angular Material theme, global resets/utilities
│   ├── environments/            # Environment-specific configurations
│   │   ├── environment.ts       # Default environment (typically development)
│   │   └── environment.prod.ts  # Production environment
│   ├── app/                     # Root application module and components
│   │   ├── app.config.ts        # Main application configuration (providers for services, routing setup)
│   │   ├── app.routes.ts        # Main application routes (including lazy-loaded feature routes)
│   │   ├── app.component.ts     # Root AppComponent (usually acts as a router-outlet host)
│   │   ├── app.component.html   # Root AppComponent template
│   │   ├── app.component.scss   # Root AppComponent styles (if any)
│   │   │
│   │   ├── core/                # Core Functionality: Singleton services, guards, interceptors, constants, core models
│   │   │   ├── guards/          # Route activation guards (standalone functions)
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── guest.guard.ts
│   │   │   ├── interceptors/    # HTTP request/response interceptors (standalone functions/providers)
│   │   │   │   ├── auth-token.interceptor.ts
│   │   │   │   └── error-handler.interceptor.ts
│   │   │   ├── services/        # Singleton services provided 'root' (using provide Fns in app.config.ts)
│   │   │   │   ├── api.service.ts          # Base service for HTTP calls
│   │   │   │   ├── auth.service.ts         # Authentication logic
│   │   │   │   ├── user.service.ts         # User profile management
│   │   │   │   ├── navigation.service.ts   # Sidebar navigation state/data
│   │   │   │   └── notification.service.ts # Optional: Global notifications (e.g., using MatSnackBar)
│   │   │   ├── constants/       # Application-wide constants
│   │   │   │   └── api-endpoints.constants.ts
│   │   │   └── models/          # Core data models/interfaces used across multiple features
│   │   │       ├── user.model.ts
│   │   │       └── auth-token.model.ts
│   │   │
│   │   ├── shared/              # Shared UI Components, Directives, Pipes, Utility Functions, Models
│   │   │   ├── components/      # Reusable presentational components (standalone)
│   │   │   │   ├── loading-spinner/ # e.g., wrapper around MatProgressSpinner
│   │   │   │   │   └── loading-spinner.component.ts
│   │   │   │   └── confirmation-dialog/ # e.g., using MatDialog
│   │   │   │       └── confirmation-dialog.component.ts
│   │   │   ├── directives/      # Reusable custom directives (standalone)
│   │   │   │   └── drag-drop-upload.directive.ts # Example for file drop zone
│   │   │   ├── pipes/           # Reusable custom pipes (standalone)
│   │   │   │   └── file-size.pipe.ts
│   │   │   ├── models/          # Shared data structures/interfaces used by features
│   │   │   │   ├── page.model.ts
│   │   │   │   ├── folder.model.ts
│   │   │   │   ├── attachment.model.ts
│   │   │   │   ├── comment.model.ts
│   │   │   │   └── api-response.model.ts
│   │   │   └── utils/           # Utility functions (e.g., debounce, validation helpers)
│   │   │
│   │   ├── layout/              # Components defining the main application structure
│   │   │   ├── app-layout/      # Authenticated view container (using MatSidenavContainer)
│   │   │   │   ├── app-layout.component.ts # (Standalone)
│   │   │   │   ├── app-layout.component.html
│   │   │   │   └── app-layout.component.scss
│   │   │   ├── header/          # Top header component (using MatToolbar)
│   │   │   │   ├── header.component.ts # (Standalone)
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.scss
│   │   │   ├── sidebar/         # Sidebar navigation component (using MatSidenav, MatNavList/MatTree)
│   │   │   │   ├── sidebar.component.ts # (Standalone)
│   │   │   │   ├── sidebar.component.html
│   │   │   │   └── sidebar.component.scss
│   │   │
│   │   └── features/            # Application features (ideally lazy-loaded via app.routes.ts)
│   │       ├── auth/            # Authentication (Login, Signup) - Often eagerly loaded
│   │       │   ├── login/
│   │       │   │   ├── login.component.ts # (Standalone)
│   │       │   │   ├── login.component.html
│   │       │   │   └── login.component.scss
│   │       │   └── signup/
│   │       │       ├── signup.component.ts # (Standalone)
│   │       │       ├── signup.component.html
│   │       │       └── signup.component.scss
│   │       │
│   │       ├── dashboard/       # Dashboard feature
│   │       │   ├── dashboard.routes.ts # Routes specific to dashboard
│   │       │   └── dashboard.component.ts # Entry component for dashboard routes (Standalone)
│   │       │
│   │       ├── page/            # Page viewing/editing/management feature
│   │       │   ├── page.routes.ts   # Routes for viewing/editing pages
│   │       │   ├── components/      # Feature-specific sub-components
│   │       │   │   ├── page-view/       # Main component loaded by route
│   │       │   │   │   └── page-view.component.ts # (Standalone)
│   │       │   │   ├── page-editor/     # Wrapper/Container for the rich text editor
│   │       │   │   │   └── page-editor.component.ts
│   │       │   │   ├── attachment-list/ # Displays attachments
│   │       │   │   │   └── attachment-list.component.ts
│   │       │   │   └── comment-section/ # Displays and adds comments
│   │       │   │       └── comment-section.component.ts
│   │       │   └── services/        # Services specific to this feature
│   │       │       ├── page.service.ts
│   │       │       ├── comment.service.ts
│   │       │       └── attachment.service.ts
│   │       │
│   │       ├── search/          # Search feature
│   │       │   ├── search.routes.ts
│   │       │   ├── components/
│   │       │   │   └── search-results/
│   │       │   │       └── search-results.component.ts # (Standalone)
│   │       │   └── services/
│   │       │       └── search.service.ts
│   │       │
│   │       └── settings/        # User settings feature
│   │           ├── settings.routes.ts
│   │           └── settings.component.ts # (Standalone)
│   │
│   └── assets/                  # Static assets
│       ├── images/              # Application images, icons
│       ├── fonts/               # Custom fonts
│       └── i18n/                # Internationalization files (if needed)
│
└── # Other root level config files (.gitignore, etc.)