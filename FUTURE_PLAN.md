# Future Plan of Action (PoA)

This document outlines the completion status of Phase 1 and proposes future enhancements for Phase 2 of the Credent Global project.

## Phase 1: Completion Status

The core functionality of the website has been implemented and documented. Key achievements include:

- **Functional Backend**: Express server setup with routing, middleware, and static file serving.
- **Frontend Integration**: EJS templates integrated with custom and vendor JavaScript libraries (jQuery, Bootstrap, Chart.js, Owl Carousel).
- **Data Handling**: Implementation of form submissions (PMS, RAF, Contact) storing data in JSON files.
- **Admin Features**: Basic admin route for viewing submissions and uploading factsheets.
- **Documentation**: Comprehensive JSDoc comments added to source code and a detailed README created.

## Phase 2: Future Enhancements

The following features and improvements are proposed for the next phase of development:

### 1. Database Integration
- **Migration from JSON**: Move data persistence from `data/contacts.json` and `data/data.json` to a robust database system like MongoDB, PostgreSQL, or MySQL.
- **Benefits**: Improved scalability, data integrity, security, and query capabilities.

### 2. Authentication & Authorization
- **Admin Security**: Implement authentication (e.g., Passport.js, JWT) for the `/superuser` route to prevent unauthorized access.
- **User Accounts**: (Optional) Allow users to create accounts to track their portfolio or referrals status.

### 3. API Enhancement
- **RESTful Design**: Refactor endpoints to follow RESTful standards more strictly (e.g., using proper HTTP verbs and status codes).
- **Validation**: Add robust input validation (using libraries like Joi or express-validator) for all form submissions to enhance security and data quality.
- **Error Handling**: Implement a centralized error handling mechanism.

### 4. Code Refactoring & Modernization
- **Modularization**: Split `index.js` into separate route and controller files for better maintainability.
- **ES6+ Features**: Refactor code to use modern JavaScript features (const/let, arrow functions, async/await) consistently throughout the backend.
- **Frontend Bundling**: Use a module bundler like Webpack or Parcel to manage frontend assets and dependencies, replacing the manual script inclusions in `main.js`.

### 5. Testing
- **Unit Tests**: Implement unit tests for backend logic using Mocha, Chai, or Jest.
- **Integration Tests**: Add integration tests for API endpoints.

### 6. Deployment & DevOps
- **Environment Variables**: Use `dotenv` to manage configuration secrets (ports, API keys) securely.
- **CI/CD**: Set up Continuous Integration/Continuous Deployment pipelines (e.g., GitHub Actions, Jenkins).
- **Containerization**: Dockerize the application for consistent deployment environments.

### 7. UI/UX Improvements
- **Accessibility**: Conduct an accessibility audit (WCAG) and improve semantic HTML and ARIA attributes.
- **Performance**: Optimize image assets and minify CSS/JS files for faster load times.
- **Responsive Design**: Further refine responsive layouts for a seamless experience across all devices.
