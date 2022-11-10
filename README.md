# FE: 
* 1) How to install and run 
* 2) Personal Auth Tokens required (Github, dotenv)
* 3) Usage Limitations : 30 requests per minute means 30 keystrokes per minute max
* 4) Searches Github Topic titles only, but due to Github API able, bring related body content. 

# Autocomplete-Frontend

This is a simple JavaScript frontend that helps autocomplete individual terms to search Github Topics for relevant answers, bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br>

Final search request carried out by the Node.js [autocomplete-backend](https://github.com/R4Y815/autocomplete-backend) to [Github Search API](https://docs.github.com/en/rest/search).

## Getting started on Visual Studio Code editor:
   1. In a new folder, git clone this repo onto the local machine.  <br>
      In the new bash terminal pane (you can use hotKey: Ctrl + Shift + ` to open a new terminal), type the following code:<br>
        `git clone https://github.com/R4Y815/autocomplete-frontend`
   2. Change the working directory to the newly cloned repo directory holding the frontend. <br>
        `cd autocomplete-frontend`
   3. Install all dependencies for the frontend locally:<br>
        `npm i`
   4. Return to parent directory:<br>
        `cd ..` 
   5. Repeat steps 1-3 to clone the backend repo and install all the dependencies for the backend locally: <br>
        `git clone https://github.com/R4Y815/autocomplete-backend`
        `cd autocomplete-backend`
        `npm i`
   6. In the current bash terminal, run the autocomplete-backend Node.js server first in development mode: <br>
        `npm run start`
   7. Open a second, new bash terminal. (Ctrl + Shift + `). <br>
   8. Change the working directory to the directory of autocomplete-frontend:<br>
        `cd autocomplete-frontend`
   9. In this second bash terminal, run this frontend:<br>:
        `npm run start`
        *If a new browser window doesn't open automatically, open one and go to this address: http://localhost:3000/*
        <image src ="https://lh3.googleusercontent.com/xQksKvRKxnM0wurF5TaahN-GwJrnuudnCZ6-t0olh6r9s1X_Z7j3DEQiugioNZpKYEuR55mdZy3mGQ-37IAnMLQCgG2bSZdGDemVNyEIHLNI0sLVbbxAG2AU4zNf1ANAFr3FNB8AFA=w600-h315-p-k" alt="autocomplete-frontend-photo" width="50vw"/>
        

  



# Getting Started with Create React App

This project was bootstrapped with 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
