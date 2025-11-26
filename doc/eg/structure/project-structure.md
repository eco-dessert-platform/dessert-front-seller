# Project Structure (FSD Perspective)

This project is structured based on the **Feature-Sliced Design (FSD)** pattern.  
Each folder is separated by responsibility, aiming for maintainability and scalability as follows:

```
src/
  app/                # App entry point, global settings, store, router, etc.
    api/              # API client and global API settings
    router/           # Router and related utils, types
    store/            # Global state management (redux, etc.)
  assets/             # Static assets like fonts, images, locales
  features/           # Business domain/feature-specific folders
    [feature]/        # e.g., sample, user, etc.
      [Feature].tsx   # UI/logic for the feature
      [feature]Reducer.ts # Reducer for the feature
  pages/              # Route-level page components (including dynamic routing)
    [route]/          # e.g., url, extra, etc.
      [Page].tsx      # Page component for the route
  shared/             # Components, utils, layouts shared across features/pages
    components/       # Common UI components (button, toast, theme, etc.)
    lib/              # External library wrappers, common hooks, styles, etc.
    utils/            # Common utility functions
    layouts/          # Common layout components (header, footer, etc.)
  stories/            # Storybook, documentation, test components
  styles/             # Global styles, variables, reset, etc.
  main.tsx            # App entry point
  App.tsx             # Root component
```

## Folder Role Summary

- **app/**: Global layer for settings, store, router, etc.
- **assets/**: Static resources like fonts, images, locales
- **features/**: Business domain-specific features (each feature can have its own UI, state, business logic)
- **pages/**: Route-level page components, supports dynamic routing
- **shared/**: Common elements reused across features/pages (components, utils, layouts, etc.)
- **stories/**: Storybook, documentation, test components
- **styles/**: Global styles, CSS variables, reset, etc.

