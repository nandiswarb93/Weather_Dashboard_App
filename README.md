Weather Dashboard App
This is a weather dashboard application that retrieves real-time weather data using the OpenWeatherMap API.

Prerequisites
Before you can run this application, you need to install the following on your machine:

Node.js 
npm (Node Package Manager)
Additionally, you will need an API key from OpenWeatherMap to fetch weather data.

Setup Instructions
1. Clone the Repository
To get started, clone this repository to your local machine:

git clone https://github.com/nandiswarb93/Weather_Dashboard_App.git\

cd Weather_Dashboard_App

2. Install Dependencies
Run the following command to install the necessary dependencies:

npm install
This will install all the required packages and libraries for the project to run.

npm install axios
for curd operations

3. Obtain API Key from OpenWeatherMap
To access weather data, you'll need an API key from OpenWeatherMap. Follow these steps:

Go to OpenWeatherMap.
Sign up for an account if you don’t have one.
Once logged in, go to the API keys section of your account.
Create a new API key and copy it.
4. Configure API Key
After obtaining your API key, you'll need to add it to the project. In your project folder, create a .env file (if not already created) and add the following:

 
REACT_APP_WEATHER_API_KEY=your_api_key_here
Replace your_api_key_here with the API key you copied earlier.

5. Run the Application
Now you’re ready to start the application. Run the following command:

 
 
npm start
This will start the application, and you can access it by opening http://localhost:3000 in your web browser.

Features
Real-time weather updates
Search functionality for different cities
Displays temperature, humidity, wind speed, etc.
