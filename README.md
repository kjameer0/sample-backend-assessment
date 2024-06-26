# Accelerator assessment

## Backend
Copy the following into a .env file that you create in your /backend folder
`PORT=3001
PG_HOST=localhost
PG_USER='postgres'
PG_PORT=5432
PG_DATABASE='animes_dev'`

1. open a terminal and cd into backend
2. run the following commands
   1. npm i
   2. npm run setup
   3. npm run start
3. you should be able to open postman get all anime from [http://localhost:3001/animes](http://localhost:3001/animes)
