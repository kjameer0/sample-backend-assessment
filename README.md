# Accelerator Assessment

## Navigating a Monorepo

This project is a monorepo, meaning that the frontend and backend are in the same repository. Please `cd` into `/backend` or `/frontend` respectiviely in order to `npm install` for both ends of the stack. They each have their own package.json and therefore their own dependencies. The frontend and backend will also need their own .env files. You will not be able to use `npm run start` or other scripts unless you are in the correct folder. `npm run start` will start the `frontend`.

## Backend

Copy the following into a .env file that you create in your /backend folder

```PORT=3001
PG_HOST=localhost
PG_USER='postgres'
PG_PORT=5432
PG_DATABASE='animes_dev'
```

1. Open a terminal and cd into backend.
2. Run the following commands:
   1. `npm i`
   2. `npm run setup`
   3. `npm run start`
3. You can confirm that your backend is running by navigating to to [http://localhost:3001](http://localhost:3001). You should see a site with the words "In Pursuit of Accelerator 2".

### Backend Assessment Instructions

1. Navigate to `backend/controllers/animeController.js`
2. There should be comments saying what routes to write and what they should do
3. You can read the test files in backend/controllers/**test** to get a better picture of how to implement the routes described in the instructions
4. You should be able to run `npm run test` and see all of the tests fail
5. The database has one table called `animes`. Each anime has an id, name, and description, all of which are required.
6. Queries that you can use are already imported in `animeController.js`. You can read backend/queries/`animes.js` to see their exact implementation. You are NOT expected to write your own queries for this exercise.
   1. `getAllAnimes`: returns an array containing all of the animes in the database
   2. `getOneAnime(animeId)`: returns an anime matching an id if it exists in the database, otherwise it returns null.
   3. `createOneAnime(name, description)`: adds a new anime to the database and returns the data for that new anime if the operation succeeded.
   4. `updateOneAnime(id, body)`: takes an id and a body object containing a name and description and updates the existing anime in the database with the matching id to have the newly provided data
   5. `deleteOneAnime(id)`: takes an id and deletes a record from the animes table matching that id

## Front End Assesment Instructions

### Setup

1. `npm install`
2. `npm run start`
3. Do not change the structure of the HTML or any of the existing class names.

### Instructions

In order to pass the assesment, please complete the tasks below.

1. In the use `Animes.js` file, fetch a list of all animes from your server.
   - You are allowed to use your choice of `axios` or `fetch`
2. Render a list of animes in `Animes.js` using the Anime component.
3. There should be at least 4 animes in your database in order to pass the tests.
4. ![Your UI should look like this.](./Screenshot%202024-07-02%20at%204.52.47%20PM.png "How your UI should look")
