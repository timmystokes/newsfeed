# Newsfeed App

This is a simple newsfeed app that I put together for Studio 71, it takes a stream of JSON newsfeed items and creates interesting data interactions.

## Implemented Functionality:
- Search newsfeed by message
- Filter newsfeed by feed item type
- Favorite posts
- Like posts
- Caches and retrieve liked and favorited posts
- Filter by liked or favorited posts
- Pagination functionality


# Setup:
to install: 
> npm install

to run: 
> npm start

Now open browser and go to 'localhost:3000' and voila!


## Additional Notes:
- The reason you can't like and favorite every item is because some of the items in the newsfeed aren't currently being keyed, this could easily be remedied by hashing all the data feed items though!