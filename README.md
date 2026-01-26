## Overview
#### A React web application that allows clients to book appointments online for visiting the banking branch.

## Tech Stack
- **Framework:** Next JS
- **Language:** React
- **Styling:** Tailwind CSS

## Prerequisites
- Node 25
- Tailwindcss 4.x

## Getting Started
### 1. Clone the Repository
    git clone https://github.com/mmgubo/mobile_app_capisto.git
### 2. Build and Run
- **To run this web app project, you will need to run it through a docker image.**

- **Please run the following commands after cloning the project:**
     ```http 
  docker build -t mobile-app-capisto .
  ```
    ```http
  docker run -p 3000:3000 mobile-app-capisto
  ```

- **Access http://localhost:3000 and you will see the running app.**

- **After the project has finished downloading, run these two commands** 
    ```http
  npm install
  ```
  ```http 
  npm run dev
  ```

- **If you are not running Node version 25, change this command **(FROM node:25)** from Dockerfile to point to the Node version your machine is running.**

