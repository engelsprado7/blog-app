# Blog App

## Project Description

The Blog App is a web application that allows users to create, read, update, and delete blog posts. It features user authentication, pagination, and a modern UI similar to Twitter. The application is built with a React frontend and an Express backend, using MongoDB for data storage. It also incorporates Redux for state management and supports user login and registration.

![image](https://github.com/user-attachments/assets/1d542b6d-26e1-4b75-b7ce-e148a961a9cc)

![image](https://github.com/user-attachments/assets/4fd1075d-29e8-44a3-a0fe-5b7c8f33fcbb)

![image](https://github.com/user-attachments/assets/37824ba2-b3b2-49a7-a501-a73dca94ea73)

![image](https://github.com/user-attachments/assets/35d08772-7466-49b5-91a6-3b5cf1077f5c)

## Features

- User authentication and authorization
- CRUD operations for blog posts
- Pagination for displaying posts
- Edit and delete posts
- Responsive design with a modern UI
- Environment-based configuration

## Technologies Used

- **Frontend**: React, Redux, Sass
- **Backend**: Express, Node.js
- **Database**: MongoDB
- **Authentication**: Passport.js
- **Testing**: Mocha, Chai

## Installation

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `client` directory and add the following variables:
    ```plaintext
    REACT_APP_URL_SERVER = 'https://blog-app-backend-st7w.onrender.com'
    
    ```

4. Start the development server:
    ```bash
    npm start
    ```

### Backend

1. Navigate to the backend directory:
    ```bash
    cd server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `server` directory with the following content:
    ```plaintext

    MONGODB_URI="mongodb+srv://engels:Rc2ptGmleaXtjeZN@cluster0.mgjqskg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    SESSION_SECRET=your_session_secret
    PORT=5000
    CLIENT_ORIGIN='https://blog-app-client-nxlr.onrender.com'

    ```

4. Start the server:
    ```bash
    npm start
    ```

## Usage

- **Login**: Navigate to `/login` to log in with your credentials.
- **Register**: Navigate to `/register` to create a new account.
- **Posts**: View, create, edit, and delete blog posts on the main page.

## Running Tests

1. Navigate to the `server` directory:
    ```bash
    cd server
    ```

2. Run the tests:
    ```bash
    npm test
    ```

## Environment Variables

- **MONGODB_URI**: MongoDB connection string.
- **SESSION_SECRET**: Secret key for session management.
- **PORT**: Port number for the backend server.
- **CLIENT_ORIGIN**: URL of the frontend application.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the feature branch.
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redux](https://redux.js.org/)
- [Passport.js](http://www.passportjs.org/)
- [Sass](https://sass-lang.com/)

