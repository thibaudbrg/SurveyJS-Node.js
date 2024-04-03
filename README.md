# SurveyJS React & Node.js Express Application

This project is a comprehensive survey application built using SurveyJS with a React frontend and an Express backend in Node.js. It's designed to create, display, and manage surveys with a rich set of features including a survey creator interface, export functionalities, and comprehensive results visualization.

## Features

- **Survey Display & Interaction**: Users can participate in surveys with a dynamic and user-friendly interface.
- **Creator Interface**: Allows for the creation and customization of surveys through a drag-and-drop interface.
- **Export to PDF**: Surveys can be exported to PDF format, facilitating easy sharing and printing.
- **Results Visualization**: Display survey results in various formats including plots and tables for easy interpretation.
- **Export Results**: Results can be exported to CSV, PDF, and other formats for analysis and reporting.

## Getting Started

To get this application running on your local machine, follow these steps:

### Prerequisites

- Node.js (Download and install from [nodejs.org](https://nodejs.org/))
- npm (Comes installed with Node.js)

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/thibaudbrg/SurveyJS-Node.js.git
    cd SurveyJS
    ```

2. **Install Backend Dependencies**

   Navigate to the backend directory and install the necessary packages.

    ```bash
    cd backend
    npm install
    ```

3. **Start the Backend Server**

   Still in the backend directory, start the server.

    ```bash
    npm start
    ```

   The server will typically run on port 5001, but you can configure this in the server settings.

4. **Install Frontend Dependencies**

   Open a new terminal window. Navigate to the frontend directory from the root of the project and install the necessary packages.

    ```bash
    cd frontend
    npm install
    ```

5. **Start the Frontend Application**

   Within the frontend directory, start the React application.

    ```bash
    npm start
    ```

   This will launch the application in your browser. If it doesn't automatically open, you can access it by visiting [http://localhost:3000](http://localhost:3000).

### Running Both Frontend and Backend Concurrently

For convenience, you can run both the frontend and backend concurrently using the `concurrently` package. This has been set up in the frontend's `package.json` file under the script `dev`.

```bash
cd frontend
npm run dev
```

### Usage
Creating Surveys: Access the creator interface through the application’s main menu to start building your surveys.
Participating in Surveys: Users can access active surveys from the homepage and submit their responses.
Viewing Results: Analyze the survey results through the results page, where data can be visualized or exported.
Contributing
Contributions to this project are welcome. Please fork the repository, make your changes, and submit a pull request.

### License
This project is licensed under the MIT License - see the `LICENSE.md file for details.