# TaskManager

## Getting Started
Web app to create, edit and delete projects, for each project add, edit, complete, and delete tasks.

## File structure

#### `client` - Holds the client application

-   #### `public` - This holds all of our static files
-   #### `src`
    -   #### `components` - This folder holds all of the different components that will make up our views
    -   #### `store` - This folder holds all of the actions and reducers to be used by redux
    -   #### `services` - Folder to store all the API requests
    -   #### `utils` - Folder to store helper functions
    -   #### `App.jsx` - This is what renders all of our browser routes and different views
    -   #### `main.jsx` - This is what renders the react app by rendering App.jsx, should not change
-   #### `package.json` - Defines npm behaviors and packages for the client

#### `server` - Holds the server application

-   #### `config` - This holds our configuration files, like mongoDB uri
-   #### `models` - This holds all of our data models
-   #### `routes` - This holds all of our HTTP to URL path associations for each unique url
-   #### `middleware` - This holds all middleware to validate authentication and request parameters.
-   #### `server.js` - Start the application backend

#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README

#### `.gitignore` - Tells git which files to ignore

#### `README` - This file!

## Available Scripts

In the project directory, you can run:

### `npm run start`

Run the app, available in both package.json (frontend and backend)<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.
API Endpoint [http://localhost:3000](http://localhost:5000).
### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run serve`
Preview locally the production build
