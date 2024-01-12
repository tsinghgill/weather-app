# Weather and Time Tracking API

This project is a simple Node.js application that provides two primary endpoints: `/hello` and `/goodbye`. It's designed to demonstrate basic API creation, session management, and integration with external APIs.

## Features

- `/hello`: Returns the current weather in the user's city, determined by their IP address.
- `/goodbye`: Returns the amount of time elapsed since the `/hello` endpoint was called.

## Technologies Used

- Node.js
- Express
- Axios for API requests
- Cookie-parser for session management
- IP Geolocation and OpenWeatherMap APIs

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need Node.js installed to run this application. You can download and install Node.js from [Node.js official website](https://nodejs.org/).

### Installing

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

#### Next, install the required packages:

```
npm install
```

#### Setting Up Environment Variables
Create a .env file in the root directory of the project and add your IPAPI and OpenWeatherMap API keys:

```
IPAPI_KEY=your_ipapi_key_here
OPENWEATHERMAP_KEY=your_openweathermap_key_here
```

### Running the Application

#### Start the server using:

```
npm start
```

The server should be running on http://localhost:3000.

#### Testing the Endpoints

To test the endpoints, you can use any API testing tool or a web browser.

For /hello: Navigate to http://localhost:3000/hello
For /goodbye: Navigate to http://localhost:3000/goodbye

### Deployment
This application can be deployed on various hosting services like Heroku, AWS, etc. Refer to the hosting service's documentation for deployment instructions.