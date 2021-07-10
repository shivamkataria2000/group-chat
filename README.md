<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Group Chat App using GraphQL</h3>
  <p align="center">
A Simple Group Chat application made using MERN (MongoDB Express React Node) stack along with graphQL and JWT based login support.
    <br />
    <br />
    <br />
    <a href="https://group-chat-kappa.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/shivamkataria2000/group-chat/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/shivamkataria2000/group-chat/issues/new">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Sample Sceenshot](screenshot.png?raw=true "Title")

This is a simple project to learn graphQL by builing a grouph chat application where we build a node.js server to host the graphql API's and a React based client to connect to it

Major Features of this application:
* Registration / Login functionality with JWT based authentication
* MongoDB Schema using Mongoose library 
* GraphQL schema generation using graphql-compose-mongoose
* React based client with Material-ui components.
* GraphQL subscriptions for real-time messaging 
  
### Built With

* [Node.js](https://nodejs.org/en/)
* [React](https://reactjs.org/)
* [Apollo GraphQL](https://www.apollographql.com/)
* [MongoDB](https://www.mongodb.com/)



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Creata a free cluster on MongoDB Atlas and get the connection URI
2. Clone the repo
   ```sh
   git clone https://github.com/shivamkataria2000/group-chat
   ```
3. Install NPM packages
   ```sh
   npm install
   cd 
   ```
4. Create a `.env` file with the following
    ```
    NODE_ENV=development
    PORT=8000
    MONGODB_URI=***GET_FROM_MONGO_DB_ATLAS****
    HEALTH_ENDPOINT=up
    JWT_SECRET=***ChangeThis***
    ```
5. Update config.js
   ```
   export const HTTP_API_URL = "http://localhost:8080/graphql";
   export const WS_API_URL = "ws://localhost:8080/graphql";
   ```
6. Start the server
   ```sh
   npm run dev
   ```
7. Start the client
   ```
   npm run client
   ```
<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Shivam Kataria - [@smartShivkat](https://twitter.com/smartShivkat) - shivamkataria2000@gmail.com

Project Link: [https://github.com/shivamkataria2000/group-chat](https://github.com/shivamkataria2000/group-chat)
