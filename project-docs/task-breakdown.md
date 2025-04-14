# Task Breakdown: Docmost Frontend Clone (Angular 19)

**Project:** Docmost Frontend Clone (Angular 19)
**Date:** April 14, 2025
**Tech Stack:** Angular 19, TypeScript, Angular Material v19 (M3 Theme), Tailwind CSS (latest), SCSS/CSS
**API Assumptions:** We will be mocking or interacting with hypothetical backend endpoints as outlined previously. All API interactions should go through dedicated Angular services.

---

## Phase 1: Project Setup & Core Infrastructure (Foundation)

1.  **Task:** **Initialize Angular 19 Project & Setup UI Libraries** [100% Complete]
    * **PRD Ref:** `NFR-01`
    * **Description:** Set up a new Angular 19 workspace using the Angular CLI (standalone components preferred, routing, SCSS). Install and configure Angular Material (`ng add @angular/material`, select M3 theme). Install and configure Tailwind CSS according to the official guide for Angular projects. Set up Prettier/ESLint for code consistency.
    * **API Endpoint(s):** `N/A`
    * **Dependencies:** None
    * **Complexity:** Medium (Initial setup of both libraries)

2.  **Task:** **Setup Core Application Routing**
    * **PRD Ref:** `FE-LAYOUT-*`, `FE-AUTH-*`
    * **Description:** Define the main application routes (e.g., `/login`, `/signup`, `/app` (for authenticated layout), `/app/dashboard`, `/app/page/:id`, `/app/settings`). Implement basic route structure and lazy loading for feature modules/routes where appropriate.
    * **API Endpoint(s):** `N/A`
    * **Dependencies:** Task 1
    * **Complexity:** Small

3.  **Task:** **Create Core HTTP Service & Error Handling**
    * **PRD Ref:** General
    * **Description:** Implement a reusable Angular service (`ApiService` or similar) to handle all HTTP requests to the backend. Include base URL configuration, standard headers (like `Content-Type`), and potentially interceptors for adding auth tokens and handling common HTTP errors (e.g., 401 Unauthorized, 500 Server Error).
    * **API Endpoint(s):** All (Foundation for API calls)
    * **Dependencies:** Task 1
    * **Complexity:** Medium

4.  **Task:** **Implement Authentication Service**
    * **PRD Ref:** `FE-AUTH-*`
    * **Description:** Create an `AuthService` responsible for handling login, signup, logout logic, storing/retrieving/clearing authentication tokens (e.g., JWT from localStorage), and managing user authentication state (e.g., using Signals or BehaviorSubject). Implement methods to call relevant auth API endpoints.
    * **API Endpoint(s):** `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/users/me`, `POST /api/auth/logout` (if implemented server-side)
    * **Dependencies:** Task 3
    * **Complexity:** Medium

5.  **Task:** **Implement Authentication Route Guards**
    * **PRD Ref:** `FE-AUTH-03`
    * **Description:** Create Angular route guards (`AuthGuard`, `GuestGuard`) using the `AuthService` to protect routes. `AuthGuard` prevents access to authenticated routes if the user is not logged in. `GuestGuard` prevents access to login/signup if the user *is* logged in.
    * **API Endpoint(s):** (Uses `AuthService` state)
    * **Dependencies:** Task 4
    * **Complexity:** Small

---

## Phase 2: Authentication UI

6.  **Task:** **Implement Login Page UI & Logic**
    * **PRD Ref:** `FE-AUTH-01`
    * **Description:** Create the standalone `LoginComponent`. Build the HTML form using Angular Material components (`MatFormField`, `MatInput`, `MatButton`). Style layout and spacing using Tailwind CSS utilities. Use Angular Forms (Reactive preferred) for validation (required, email format). Connect to `AuthService.login()` method on submit. Handle loading states (e.g., disable button, show spinner) and display API error messages (e.g., using Material components). Redirect on success. Include link to Signup page.
    * **API Endpoint(s):** `POST /api/auth/login` (via AuthService)
    * **Dependencies:** Task 1, Task 2, Task 4
    * **Complexity:** Medium

7.  **Task:** **Implement Signup Page UI & Logic**
    * **PRD Ref:** `FE-AUTH-02`
    * **Description:** Create the standalone `SignupComponent`. Build the HTML form using Material components (`MatFormField`, `MatInput`, `MatButton`) and Tailwind CSS for layout. Include username, email, password, confirm password inputs. Use Angular Forms for validation (required, email format, password match). Connect to `AuthService.register()` method on submit. Handle loading states and display API error messages. Redirect on success (e.g., to login page). Include link to Login page.
    * **API Endpoint(s):** `POST /api/auth/register` (via AuthService)
    * **Dependencies:** Task 1, Task 2, Task 4
    * **Complexity:** Medium

---

## Phase 3: Main Application Layout & Core UI

8.  **Task:** **Create Authenticated Layout Component**
    * **PRD Ref:** `FE-LAYOUT-*`
    * **Description:** Create a core layout component (`AppLayoutComponent` or similar) using Angular Material (`MatSidenavContainer`, `MatSidenav`, `MatSidenavContent`) for the main structure. Include router outlets for sidebar, header, and main content. Use Tailwind CSS for fine-tuning layout spacing and responsive behavior of the container.
    * **API Endpoint(s):** `N/A`
    * **Dependencies:** Task 1, Task 2
    * **Complexity:** Medium

9.  **Task:** **Implement Top Header Bar Component**
    * **PRD Ref:** `FE-LAYOUT-02`
    * **Description:** Create the `HeaderComponent` using `MatToolbar`. Style with Tailwind CSS. Include placeholders for breadcrumbs, the global search bar component (Task 26), and a user profile dropdown menu using `MatMenu` triggered by a `MatButton` with a `MatIcon`. Implement the user dropdown links to Settings and the Logout action (calling `AuthService.logout()`).
    * **API Endpoint(s):** (Uses `AuthService` state/logout method)
    * **Dependencies:** Task 1, Task 4, Task 8
    * **Complexity:** Medium

10. **Task:** **Implement Persistent Navigation Sidebar Component (Structure)**
    * **PRD Ref:** `FE-LAYOUT-01`, `FE-MANAGE-01`
    * **Description:** Create the `SidebarComponent` within the `MatSidenav`. Implement the basic structure using `MatNavList` or potentially `MatTree` (evaluate complexity). Style with Tailwind CSS. Fetch the initial page/folder tree structure. Display the hierarchical list (non-interactive first version). Include a "Create New Page" button (`MatButton` with `MatIcon`).
    * **API Endpoint(s):** `GET /api/spaces/{spaceId}/navigation` (Requires a new `NavigationService` or similar)
    * **Dependencies:** Task 1, Task 8
    * **Complexity:** Medium-Large (Fetching/displaying/styling tree)

11. **Task:** **Implement Basic Dashboard Component**
    * **PRD Ref:** `FE-DASH-*`
    * **Description:** Create the `DashboardComponent`. Use Tailwind CSS for layout. Display a welcome message. Fetch and display a list of recently accessed pages using `MatCard` or `MatList`. Ensure titles link to placeholder page routes. Include a "Create New Page" `MatButton`.
    * **API Endpoint(s):** `GET /api/pages?filter=recent&limit=10` (Requires a `PageService`)
    * **Dependencies:** Task 1, Task 8
    * **Complexity:** Small

---

## Phase 4: Page/Folder Management & Navigation

12. **Task:** **Enhance Sidebar Navigation (Interaction)**
    * **PRD Ref:** `FE-LAYOUT-01`, `FE-MANAGE-*`
    * **Description:** Make the sidebar tree interactive. Implement expand/collapse for folders (using Material components or custom logic styled with Tailwind). Ensure clicking a page navigates to the `page/:id` route. Use `routerLinkActive` or similar with Tailwind classes for visual indication of the active page. Use `MatRipple` for interaction feedback.
    * **API Endpoint(s):** `N/A` (Client-side state/routing)
    * **Dependencies:** Task 10
    * **Complexity:** Medium

13. **Task:** **Implement 'Create New Page' Functionality**
    * **PRD Ref:** `FE-MANAGE-02`
    * **Description:** Hook up the "Create New Page" `MatButton`. On click, use `MatDialog` to prompt for a page title or implement an inline form using Material components. Call the API to create the page. On success, refresh the sidebar navigation and redirect to the new page's editor view (`/app/page/:newPageId?edit=true`).
    * **API Endpoint(s):** `POST /api/pages` (via PageService)
    * **Dependencies:** Task 1, Task 10, Task 11, PageService
    * **Complexity:** Medium

14. **Task:** **Implement 'Create New Folder' Functionality**
    * **PRD Ref:** `FE-MANAGE-03`
    * **Description:** Add a context menu (`MatMenu`) or button (`MatButton` with `MatIcon`) in the sidebar. Use `MatDialog` to prompt for folder name. Call the API to create the folder. On success, refresh the sidebar navigation.
    * **API Endpoint(s):** `POST /api/folders` (or `POST /api/pages` with type) (via NavigationService/PageService)
    * **Dependencies:** Task 1, Task 10, Task 12
    * **Complexity:** Medium

15. **Task:** **Implement Rename Page/Folder Functionality**
    * **PRD Ref:** `FE-MANAGE-04`
    * **Description:** Add context menu option (`MatMenu`) on sidebar items for "Rename". Implement inline editing (styled with Tailwind) or use `MatDialog` for the prompt. Call the appropriate API endpoint on save. Refresh the sidebar on success.
    * **API Endpoint(s):** `PATCH /api/pages/{pageId}`, `PATCH /api/folders/{folderId}`
    * **Dependencies:** Task 1, Task 12
    * **Complexity:** Medium

16. **Task:** **Implement Delete Page/Folder Functionality**
    * **PRD Ref:** `FE-MANAGE-05`
    * **Description:** Add context menu option (`MatMenu`) for "Delete". Show a confirmation `MatDialog` before proceeding. Call the appropriate API endpoint on confirmation. Refresh the sidebar and potentially navigate away if the current page was deleted.
    * **API Endpoint(s):** `DELETE /api/pages/{pageId}`, `DELETE /api/folders/{folderId}`
    * **Dependencies:** Task 1, Task 12
    * **Complexity:** Medium

17. **Task:** **Implement Drag-and-Drop Reordering in Sidebar**
    * **PRD Ref:** `FE-LAYOUT-01`, `FE-MANAGE-06`
    * **Description:** Integrate Angular CDK DragDrop (`@angular/cdk/drag-drop`) into the sidebar tree. Style drag handles, previews, and drop zones using Tailwind CSS. On drop, determine the new parent and order, then call the backend API. Update the sidebar UI.
    * **API Endpoint(s):** `PATCH /api/nodes/move` or `PATCH /api/navigation/reorder`
    * **Dependencies:** Task 1, Task 12
    * **Complexity:** Large (CDK DragDrop in trees + styling)

---

## Phase 5: Document Viewing & Editing

18. **Task:** **Implement Basic Page View Component**
    * **PRD Ref:** `FE-VIEW-01`, `FE-VIEW-04`
    * **Description:** Create the `PageViewComponent`. Use Tailwind CSS for the main content layout. Fetch page data. Render the page title (e.g., `<h1>` styled with Tailwind) and placeholder metadata. Render the fetched HTML content within a styled container.
    * **API Endpoint(s):** `GET /api/pages/{pageId}` (via PageService)
    * **Dependencies:** Task 1, Task 2, PageService
    * **Complexity:** Medium

19. **Task:** **Integrate Document Viewer Library (PDF, Images)**
    * **PRD Ref:** `FE-VIEW-02`, `FE-VIEW-03`
    * **Description:** Research and select a suitable Angular document viewer library. Integrate it into the `PageViewComponent` or a dedicated `AttachmentViewerComponent`. Style any custom controls or container elements using Tailwind CSS / Angular Material (`MatButton`, `MatIcon` for zoom etc. if needed).
    * **API Endpoint(s):** `GET /api/attachments/{attachmentId}` (to get file URL or blob)
    * **Dependencies:** Task 18, Library Selection
    * **Complexity:** Medium-Large

20. **Task:** **Integrate Rich Text Editor Library**
    * **PRD Ref:** `FE-EDIT-*`
    * **Description:** Research and select a suitable Angular rich-text editor library. Integrate the editor into `PageViewComponent`. Configure basic formatting options. Style the editor container and potentially customize the toolbar appearance using Tailwind CSS or custom SCSS overriding library defaults if necessary. Load existing content.
    * **API Endpoint(s):** (Loads content from `GET /api/pages/{pageId}`)
    * **Dependencies:** Task 18, Library Selection
    * **Complexity:** Large

21. **Task:** **Implement Page Content Saving**
    * **PRD Ref:** `FE-EDIT-10`, `FE-EDIT-11`
    * **Description:** Add a "Save" `MatButton` to the editor interface. On click, get content and call the API. Implement save status indicators (e.g., using `MatProgressSpinner` or text messages styled with Tailwind).
    * **API Endpoint(s):** `PATCH /api/pages/{pageId}` (via PageService)
    * **Dependencies:** Task 1, Task 20
    * **Complexity:** Medium

*(Note: Real-time collaboration deferred.)*

---

## Phase 6: Attachments & Uploads

22. **Task:** **Display Page Attachments List**
    * **PRD Ref:** `FE-MANAGE-07`, `FE-VIEW-02`
    * **Description:** In `PageViewComponent`, fetch and display attachments using `MatList`. Use `MatIcon` for file type icons. Style list items using Tailwind CSS. Clicking should trigger viewer/download.
    * **API Endpoint(s):** `GET /api/pages/{pageId}/attachments`
    * **Dependencies:** Task 1, Task 18
    * **Complexity:** Medium

23. **Task:** **Implement File Upload Button & Logic**
    * **PRD Ref:** `FE-MANAGE-07`
    * **Description:** Add an "Upload Attachment" `MatButton`. Use a hidden file input triggered by the button. On file selection, call the upload API. Refresh list on success. Handle errors (e.g., using `MatSnackBar`).
    * **API Endpoint(s):** `POST /api/pages/{pageId}/attachments` (multipart/form-data)
    * **Dependencies:** Task 1, Task 22
    * **Complexity:** Medium

24. **Task:** **Implement Drag-and-Drop File Upload Zone**
    * **PRD Ref:** `FE-MANAGE-07`
    * **Description:** Create a directive or component section. Style the drop zone using Tailwind CSS, including visual feedback on dragover (e.g., changing background/border). On drop, trigger upload logic.
    * **API Endpoint(s):** `POST /api/pages/{pageId}/attachments` (multipart/form-data)
    * **Dependencies:** Task 1, Task 23
    * **Complexity:** Medium

25. **Task:** **Implement Upload Progress Indicators**
    * **PRD Ref:** `FE-MANAGE-07`
    * **Description:** Enhance upload process to display progress using `MatProgressBar` within the attachment list or a temporary upload queue display styled with Tailwind. Requires handling `HttpClient` progress events.
    * **API Endpoint(s):** `N/A`
    * **Dependencies:** Task 1, Task 23, Task 24
    * **Complexity:** Medium

---

## Phase 7: Search, Comments, Settings

26. **Task:** **Implement Global Search Input Component**
    * **PRD Ref:** `FE-SEARCH-01`
    * **Description:** Create `SearchInputComponent` using `MatFormField`, `MatInput`, and `MatIcon`. Style with Tailwind as needed. Implement debouncing and trigger logic.
    * **API Endpoint(s):** `N/A`
    * **Dependencies:** Task 1, Task 9
    * **Complexity:** Small

27. **Task:** **Implement Search Results Page/Display**
    * **PRD Ref:** `FE-SEARCH-02`, `FE-SEARCH-03`
    * **Description:** Create `SearchResultsComponent` or similar. Call search API. Display results using `MatList` or `MatCard`, styled with Tailwind. Handle loading (`MatProgressSpinner`) and no-results states.
    * **API Endpoint(s):** `GET /api/search?query={searchText}` (via SearchService)
    * **Dependencies:** Task 1, Task 26, SearchService
    * **Complexity:** Medium

28. **Task:** **Implement Comments Display**
    * **PRD Ref:** `FE-COMMENT-01`
    * **Description:** Create `CommentsComponent`. Fetch and display comments using `MatCard` or custom divs styled with Tailwind. Show author, timestamp, text.
    * **API Endpoint(s):** `GET /api/pages/{pageId}/comments` (via CommentService)
    * **Dependencies:** Task 1, Task 18, CommentService
    * **Complexity:** Medium

29. **Task:** **Implement Add New Comment Functionality**
    * **PRD Ref:** `FE-COMMENT-02`, `FE-COMMENT-03`
    * **Description:** Add comment form using `MatFormField`/`MatInput` (textarea) and `MatButton`. Call API on submit. Refresh list.
    * **API Endpoint(s):** `POST /api/pages/{pageId}/comments` (via CommentService)
    * **Dependencies:** Task 1, Task 28
    * **Complexity:** Small

30. **Task:** **Implement Settings Page (User Profile)**
    * **PRD Ref:** `FE-SETTINGS-01`
    * **Description:** Create `SettingsComponent`. Use Tailwind for layout. Use Angular Forms with Material components (`MatFormField`, `MatInput`, `MatButton`) for profile update and password change forms. Call respective APIs on save.
    * **API Endpoint(s):** `GET /api/users/me`, `PATCH /api/users/me`, `POST /api/users/me/password` (via UserService/AuthService)
    * **Dependencies:** Task 1, Task 2, Task 4, UserService
    * **Complexity:** Medium

---

## Phase 8: Sharing UI & Final Touches

31. **Task:** **Implement Sharing Modal UI (Placeholder)**
    * **PRD Ref:** `FE-SHARE-*`
    * **Description:** Add "Share" `MatButton`. Create `ShareModalComponent` using `MatDialog`. Layout the modal content using Tailwind CSS. Use Material components (`MatFormField`, `MatInput`, `MatSelect`, `MatButton`, `MatList`) for the placeholder UI elements (invite input, permissions list, link generation).
    * **API Endpoint(s):** `N/A` (UI placeholders)
    * **Dependencies:** Task 1, Task 18
    * **Complexity:** Medium

32. **Task:** **Responsive Design Implementation**
    * **PRD Ref:** `NFR-02`
    * **Description:** Review all components. Apply Tailwind CSS responsive modifiers (e.g., `sm:`, `md:`, `lg:`) to ensure adaptability. Test `MatSidenav` behavior on mobile, header adjustments, grid/flex layouts, font sizes etc.
    * **API Endpoint(s):** `N/A`
    * **Dependencies:** All UI tasks, Task 1
    * **Complexity:** Large

33. **Task:** **Basic Accessibility Review (A11y)**
    * **PRD Ref:** `NFR-04`
    * **Description:** Perform basic accessibility check. Leverage built-in Angular Material a11y features. Ensure custom elements styled with Tailwind are keyboard navigable and have proper ARIA attributes if needed. Check contrasts.
    * **API Endpoint(s):** `N/A`
    * **Dependencies:** All UI tasks, Task 1
    * **Complexity:** Medium

---