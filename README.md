# DYOR

## Overview

**DYOR** is a web application for users to view specific cryptocurrencies and their details. 
Users may search for cryptocurrencies by name and ticker symbol, add cryptocurrencies to their watchlist, and view the price, percentage change and 24 hour price chart for each currency.

##[Click here to visit the DYOR live site!](https://dyor-platform.herokuapp.com/cryptocurrencies)

## Table of Contents

1. [Overview](#overview)
2. [Livelink](#live-link)
3. [How to install/start DYOR](#how-to-use)
4. [High-level Architectural Overview](#architechtural-overview)
5. [Architechtural Design Pattern](#mvc)
6. [REST API expected payload and response](#payload-response)
7. [Distinct Design Decisions](#app-design-decisions)
8. [User flow](#views-and-flow)

## How to install and run DYOR

1. Clone the DYOR repository at https://github.com/WellHelloIvy/platform.git
2. Install the application dependencies:
> Run the ```npm install``` command in both the frontend and backend directories
3. Set up a postgresSQL user and database
4. Create a .env file in the backend directory
```
PORT=5000
DB_USERNAME=<database username here>
DB_PASSWORD=<database password here>
DB_DATABASE=<database name here>
DB_HOST=localhost
JWT_SECRET=<JWT secret here>
JWT_EXPIRES_IN=604800
```
5. Migrate and seed your database
> In the backend directory run the ```npx dotenv sequelize-cli db:migrate``` command followed by the ```npx dotenv sequelize-cli db:seed:all``` command
6. Start the applications servers
> In the backend directory run the ```npm start``` command
> In the frontend directory run the ```npm start``` command

## Architectural Overview and Relavent Data models

**Database Schema**
The database is set up so the application has room to grow. Dyor currently uses the Users, Watchlists, and WatchlistCryptos tables. 
- Each user has one default watchlist (though the database is set up to handle multiple watchlists, multiple watchlists hasn't yet been implemented)
- Cryptocurrencies can be added and removed from user watchlists (this creates/deletes an entry on the WatchlistCryptos table)
- The Transactions and Assets tables will be used when I implement faux buying/selling
![The database scheme for DYOR](https://i.imgur.com/Lh3tp3c.png) 

**Redux Store**
I set up the redux store to maintain a separation of concerns and also avoid redundancies
- the cryptocurrencies slice populates the cryptocurrencies table, where users go to search/scroll through all available cryptocurrencies
- the cryptodetails slice holds the information displayed on the information page for individual cyptocurrencies. 
> - a separate fetch call to a third party (Coinbase) API needs to be made for each individual page 
![Redux state structure](https://i.imgur.com/czA3hGZ.png)

**Main Components** 

## Architectural Pattern
The app follows a Model-View-Controller architectural pattern. This architecture naturally lends itself to React/Redux Apps.  
- The redux store acts as the Model which manages the data for the application
- The controller (in the form of reducers and thunks) manipulates the Model
- The React components serve as the View - the User Interface portion of the application

## REST API

## View and User flow
Upon navigation to the website, the user will be presented with a Splash Page. The user may signup, login (if they already have an account), or use the demo button.
![](https://i.imgur.com/IGMM666.png)

The home page serves as the users dashboard. There they can view their Watchlist, a list of cryptocurrencies they'd like to keep an eye on. On this page they remove cryptocurrencies from their watchlist by clicking the ```REMOVE``` button.
![](https://i.imgur.com/eGqmnVd.png)





