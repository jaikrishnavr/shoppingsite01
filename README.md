# Getting Started with Creating backend 

## Available Scripts

In the project directory, you can run:
### `npm init`

### `npm i express`

### `npm i -D nodemon concurrently`

### `npm start`

### `npm i -D dotenv `

### `npm i mongoose`

### `npm i bcryptjs`

### ` npm i colors` //optional one 

### `npm i jsonwebtoken`

### `npm i cookie-parser`

### `npm i multer`



Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### package.json

....
....
....
  "type": "module", // Specifies that your project uses ES6 modules.
....
....
....


"scripts": {
  // This script starts the Node.js server in the 'backend' directory.
  "start": "node backend/server.js", 

  // This script uses 'nodemon' to monitor changes in the server.js file and auto-restart the server.
  "server": "nodemon backend/server.js",

  // This script starts the frontend application in the 'frontend' directory.
  "client": "npm start --prefix frontend"

   // Concurrently runs both server and client scripts.
   "dev": "concurrently \"npm run server\" \"npm run client\"" 
},
