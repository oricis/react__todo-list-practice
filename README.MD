# TO-DO List App
## **[Go to "TO-DO List App v.1.2.1" page][1]**

This is a personal use free web application to create a task list. The app use your navigator local data storage to store your tasks.

Neither data or use stadictics is sending to Internet, you only need open the page to use the app. An Internet connection won't necessary any time to run the app, then you can save the page to your computer if you want use it disconnected in the future.

***
## How to use

![alt text](https://user-images.githubusercontent.com/7187599/70058099-9b42f100-15de-11ea-8569-5dca03df1426.png "App v.1.2.0 example capture")

You can create a new task typing something in the form field, then push the "Add button" or the Enter key.

Use the "Clear button" to clear the typed text.

One task's card has five elements in this order:
 1. **The edit button**. Puts the focus over the text and allow to change it.
 2. **The color picket**. Is used to priorize the tasks. Tasks are created with a green circle by default. Available colors are green, yellow and red.
 3. **The task description**. The text that you typed to create the task.
 4. **One button to mark as completed** the task.
 5. **One button to delete** the task's card.

Then, you can edit the task texts, use the color picket to assign diferent priorities to tasks and you can mark one task as completed or delete it when you want.

***
## Components structure

    src
      |
      |---index.js
      |---serviceWorker.js
      |
      |--- assets/
      |      |
      |      |--- images/
      |      |      |
      |      |      |--- *.svg
      |      |
      |      |--- styles/*
      |             |
      |             |--- App.scss
      |             |--- vars.scss
      |
      |--- classes/
      |      |
      |      |--- List.js
      |      |--- Task.js
      |
      |--- components/
      |      |
      |      |--- App.jsx
      |      |
      |      |--- common/
      |      |      |
      |      |      |--- color-picket/*
      |      |      |--- image-button/*
      |      |      |--- text-button/*
      |      |      |--- text-label/*
      |      |
      |      |--- config-actions/
      |      |      |
      |      |      |--- ConfigAction.jsx
      |      |      |--- styles.scss
      |      |
      |      |--- forms/
      |      |      |
      |      |      |--- ListForm.jsx
      |      |      |--- TaskForm.jsx
      |      |      |--- styles.scss
      |      |
      |      |--- layouts/
      |             |
      |             |--- footer/
      |             |      |
      |             |      |--- footer.scss
      |             |      |--- Footer.jsx
      |             |
      |             |--- header/
      |             |      |
      |             |      |--- header.scss
      |             |      |--- Header.jsx
      |             |
      |             |--- main/
      |                    |
      |                    |--- cards/
      |                    |      |
      |                    |      |--- list/*
      |                    |      |--- task/*
      |                    |      |
      |                    |      |--- Cards.jsx
      |                    |      |--- styles.scss
      |                    |
      |                    |--- Main.jsx
      |
      |--- helpers/
      |      |
      |      |--- generateID.js
      |      |--- todo.js
      |
      |--- services/
      |      |
      |      |--- Storage.js
      |
      |--- tests/*


***
## About
This app was developed from [Create React App][2] in 2019 by **Moisés Alcocer** as *first React practice into a course*.

**@uthor website: https://www.ironwoods.es**

[1]: https://oricis.github.io/react__todo-list-practice/
[2]: https://github.com/facebook/create-react-app

Copyright © Moisés Alcocer 2019. MIT Licensed.

***
***
***
***
***

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
