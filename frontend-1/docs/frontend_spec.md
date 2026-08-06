# Frontend Specification Document

## Project Overview
This document outlines the specifications for implementing the frontend UI of the application using React. The UI will be developed based on the provided design and will integrate seamlessly with the existing FastAPI backend.

## UI Design Reference
- The UI design is available in the following file: `frontend/docs/chat_ui_설계도.jpg`. This design will serve as the primary reference for the layout, components, and user interactions.

## Project Structure
The frontend project will be structured as follows:

```
frontend/
├── docs/
│   ├── frontend_spec.md
│   └── 프롬프트.md
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   └── index.js
└── public/
```

### Components
- **ChatComponent**: This component will handle the chat interface, including message display and input.
- **HeaderComponent**: This will display the application header.
- **FooterComponent**: This will display the application footer.

### Pages
- **HomePage**: The main landing page of the application.
- **ChatPage**: The page where users can interact with the chat functionality.

### Services
- **apiService.js**: This file will contain functions to interact with the FastAPI backend, including sending and receiving messages.

## Integration with FastAPI
- The frontend will communicate with the FastAPI backend using RESTful API calls.
- Axios will be used for making HTTP requests to the backend.
- Ensure that all API endpoints are correctly defined and tested.

## Coding Principles
- Write clean and maintainable code that is easy for beginners to understand.
- Follow best practices for React development, including component reusability and state management.
- Thoroughly review the specifications to avoid errors in the implementation.

## Development Guidelines
- Use Context7 MCP for code generation, refactoring, and library usage verification.
- Refer to the official documentation for FastAPI, React, Vite, and Ollama as needed.

## Conclusion
This specification serves as a guideline for the development of the frontend UI. Adhering to these specifications will ensure a cohesive and functional application that meets user needs.