# Zaxix PharmaMachine Website - AI Coding Instructions

This is a static website built with vanilla HTML, CSS, and JavaScript. There are no build tools, package managers, or frameworks.

## Core Architecture

The project consists of three main files:

1.  **`index.html`**: This is the single source of truth for the website's structure and content. All sections of the page are laid out here.
2.  **`style.css`**: This file contains all custom styles. It uses CSS variables (e.g., `--color-primary`, `--radius-lg`) for theming and consistency. When adding or modifying styles, please adhere to the existing variable system.
3.  **`app.js`**: This file manages all client-side interactivity, animations, and form handling.

## Key JavaScript Patterns

- **Initialization**: All JavaScript functionality is initialized within the `DOMContentLoaded` event listener in `app.js`. New features should be initialized here as well.
- **Global Functions for `onclick`**: A key pattern is making functions globally accessible to be used with `onclick` attributes in `index.html`. Functions like `openModal`, `closeModal`, and `scrollToSection` are attached to the `window` object inside the `setupGlobalFunctions` function. If you add a new function that needs to be called from an `onclick` attribute, you must add it to this setup function.

    *Example from `app.js`*:
    ```javascript
    function setupGlobalFunctions() {
        window.openModal = openModal;
        window.closeModal = closeModal;
        // ... add new global functions here
    }
    ```

- **Modularity**: Although it's a single file, `app.js` is organized by features into distinct functions like `initModernNavigation()`, `initProductFilters()`, and `initFormHandling()`. Please maintain this modular structure when adding new functionality.

## Developer Workflow

- **Development**: To see changes, simply open `index.html` in a web browser and refresh the page after making edits to any of the files.
- **Dependencies**: The only external dependency is Google Fonts, linked in the `<head>` of `index.html`. No package installation is required.
- **No Tests**: There is no automated testing framework in place. All testing is done manually.
