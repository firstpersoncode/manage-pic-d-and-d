# Manage pictures (Drag and Drop)
Just a sample app for managing picture with draggable functionality using ReactJS and nodeJS

## Get Started:

- clone project `git clone https://github.com/firstpersoncode/piktojstest.git`
- install globally for babel-cli, jasmine, webpack, and webpack-dev-server `npm install -g babel-cli jasmine webpack webpack-dev-server`, we are going to use their CLIs
- install dependencies `npm install`
- bundle files `npm run build`, will also run unit test jasmine
- start the app `npm run start`

## Features

- user can see the existing images from folder `images` to the images list
- user can *upload image* to folder `images` and directly added to images list
- user can *add and remove image / text* from the menu to the canvas
- user can *move the image / text* around the canvas
- the created objects on canvas can be saved and repopulated on refresh browser

## App Guide

- upload new image, click *input* field, pick image, and click *upload* button
- add image to canvas, click image thumbnail under *asset* menu. image will be *dragable* around canvas
- add text to canvas, click *add text* button, type any word, press *enter* or click *submit*. text will be *dragable* around canvas
- remove item from canvas, drag item to the *bin* icon
- manage image in asset, click *manage assets* button, click any image, click *preview* for preview the image in big sized, click *delete* for remove image from asset menu.

## About the app

- work on modern browsers (Chrome / Firefox)
- logic and data flow are written in a functional and reactive way
    Separate the logic between app state and view / user interactions (unidirectional data flow).
- using **ReactJS** for client side and **ReduxJS** for managing app state
- **ExpressJS** for server side
- Unit testing with **Jasmine**
- **webpack** for compiling and bundle files
