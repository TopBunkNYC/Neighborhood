# Neighborhood
This is the "Neighborhood" module in our TopBunk web application.


## Related Projects

  - https://github.com/TopBunkNYC/Description
  - https://github.com/TopBunkNYC/Booking
  - https://github.com/TopBunkNYC/Reviews

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## Development
Set up postgreSQL and create a database named "neighborhood"

Create config.js file and save postgreSQL password in this format
```js
module.exports = {
 DB_PASSWORD: "your_password"
}}
```

To set up development environment:
```sh
# Compile bundle.js using Webpack
npm run build

# To create a CSV file with 10 million fake entries using Node.js:
npm run load

# To create 10 million CSV file with 10 million fake entries using Go:
npm run go-seed

# To seed Listings CSV, Neighborhood data, and Landmarks data into postgreSQL database:
npm run seed

# Start the server
npm start-dev
```

Access the application at (http://localhost:5001)


## Data Schema
This module's data is stored in a SQL database. There are three tables: 
* **Listings:** each record corresponds to one listing on Staybnb, and includes location information (lat/long) and host-inputted descriptions.
* **Neighborhoods:** each record corresponds to one of 15 neighborhoods in which all listings are located, and includes identifying names for different geographic levels related to the neighborhood as well as seven features of the neighborhood.
* **Landmarks:** each record corresponds to a well-known landmark in London, along with its location (lat/long). This data will be used to display to the client the five nearest landmarks to a given listing.

The schema is shown below.

![database schema](https://www.lucidchart.com/publicSegments/view/853181f4-358a-498e-ac6f-e406d5e1e8a9/image.png)
