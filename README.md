# Neighborhood
This module displays information about the neighborhood of a specific Staybnb listing. 

## Data Schema
This module's data is stored in a SQL database. There are three tables: 
* **Listings:** each record corresponds to one listing on Staybnb, and includes location information (lat/long) and host-inputted descriptions.
* **Neighborhoods:** each record corresponds to one of 15 neighborhoods in which all listings are located, and includes identifying names for different geographic levels related to the neighborhood as well as seven features of the neighborhood.
* **Landmarks:** each record corresponds to a well-known landmark in London, along with its location (lat/long). This data will be used to display to the client the five nearest landmarks to a given listing.

The schema is shown below.

![database schema](https://www.lucidchart.com/publicSegments/view/853181f4-358a-498e-ac6f-e406d5e1e8a9/image.png)
