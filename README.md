Installation Guide

1. Install Node.js
    
    Go to the official Node.js website at https://nodejs.org and download the recommended version for your operating system. Run the downloaded installation file and follow the on-screen instructions to complete the installation. Once the installation is complete, open the command line or terminal on your operating system.

2. Clone the project

    Use Git to clone the repository:

        git clone https://github.com/diegomottadev/survey-app-back.git

3. Install Dependencies
    Navigate to the project directory and install the dependencies:

        cd survey-app-back
        npm install

4. Install a web server and activate the Mysql service
    
    Install a web server such as XAMPP or WAMP for local development purposes. Activate the Mysql service to allow communication with the database.

5. Install Sequelize-cli    
    
    Sequelize-cli provides a set of useful commands to interact with Sequelize and simplify the process of developing database-based applications. Install it using npm:

        npm install --save-dev sequelize-cli
6. Set up the Database

    Create the database and run the migrations and seeders:

        sequelize db:create
        sequelize db:migrate
        sequelize db:seed:all
7. Run the Application

    Finally, start the application by running:

        npm start

The application will run on your local server at http://localhost:3000.
