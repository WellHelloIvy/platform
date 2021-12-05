# DYOR

## Overview

**DYOR** is a web application for users to view specific cryptocurrencies and their details. 
Users may search for cryptocurrencies by name and ticker symbol, add cryptocurrencies to their watchlist, and view the price, percentage change and 24 hour price chart for each currency.

## [Click here to visit the DYOR live site!](https://dyor-platform.herokuapp.com/cryptocurrencies)

## Table of Contents

1. [Overview](#overview)
2. [How to install/start DYOR](#how-to-install-and-run-dyor)
3. [High-level Architectural Overview](#architectural-overview-and-relavent-data-models)
4. [Architechtural Design Pattern](#architectural-pattern)
5. [REST API expected payload and response](#rest-api)
6. [User flow and Distinct Design Decision](#views-user-flow-and-distinct-design-decision)
7. [Reusable Component](#reusable-component)
8. [5 MUI Components](#5-mui-components)

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
- The React components serve as the View - the User interacts with the View which triggers the Controller.
- The Controller (in the form of reducers and thunks) is responsible for manipulating the Model
- The Model (the redux store) manages the data for the application

## REST API

router.get(
  ```
  '/',
  expressAsyncHandler(async(req, res): Promise<any> => {
    const watchlists = await db.Watchlist.findAll({
      include: {model: db.WatchlistCrypto}
    })
    return res.json(watchlists)
  })
)
```

Payload: GET Request do not have headers or payloads

- Response: an array of watchlist objects 

## Views, User flow, and Distinct Design Decision
Upon navigation to the website, the user will be presented with a Splash Page. The user may signup, login (if they already have an account), or use the demo button.
![](https://i.imgur.com/IGMM666.png)

Upon log in/sign up, the user is redirected to the watchlist page. This serves as the user's dashboard. There they can view their Watchlist, a list of cryptocurrencies they'd like to keep an eye on. On this page they remove cryptocurrencies from their watchlist by clicking the ```REMOVE``` button.
![](https://i.imgur.com/eGqmnVd.png)

The cryptocurrencies page is where the user can search or scroll through all available cryptocurrencies. While on this page, they can also add or remove cryptocurrencies to / from their watchlist. This is done by clicking the conditionally rendered ```ADD``` or ```REMOVE``` buttons.
On this page I made a **specific design decision** to only render the cyptocurrency ticker symbols and names. Rendering pricing information on this page would have required making over 300 fetch calls to the Coinbase API. To avoid this, the website doesn't render any pricing information unless a user clicks on a specific cryptocurrency. 
![](https://i.imgur.com/gUXA8hg.png)

From either the watchlist page, or the cryptocurrencies page, the user may click on a specific cryptocurrency to view the cryptocurrency's 24 hour price chart, percentage change, and current price. 
![](https://i.imgur.com/7hvo7EP.png)

## Reusable Component
The reusable component I created for DYOR is the ```<WatchlistButton>```. It's used on both the user watchlist and the cryptocurrencies table. 
- If a cryptocurrency is already on the user watchlist, it renders as a delete button and when clicked, deletes the cryptocurrency from the user's watchlist.
- If a cryptocurrency is not on the user watchlist, it renders as an add button and when clicked, adds the cryptocurrency to the user's watchlist.

## 5 MUI Components
1. Buttons - LOG-IN, SIGN UP, and DEMO buttons ```<LoginFormModal />```, ```<SignupFormModal />```, and ```<Demo />```  
2. Data Table - renders all cryptocurrencies ```<CryptocurrencyTable />```
3. List - renders the user's watchlist ```<Watchlist />```
4. Tabs - used to navigate between pages ```<Navigation```
5. Icons - used in my conditionally rendered add to/delete from watchlist button ```<WatchlistButton />```


