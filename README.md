# bom

## To start development environment
`npm run dev`

## To start production environment
`npm start`

## To run test
### Please start development environment before running the tests
`npm run test`

## To run in docker
`docker compose up`

## To deploy
#### Build the Dockerfile in the current directory and push the Docker image.
`heroku container:push web`

#### Release the newly pushed images to deploy your app.
`heroku container:release web`