# Kajabi Employee Directory

This project contains a `/frontend` folder and `/backend` folder with the rails API configured.

# Table of contents

- [Install](#install)
- [Usage](#usage)
- [Running the tests](#running-the-tests)
- [Todos](#todos)

## Install
```
docker-compose build
```

There is no need to something locally, only start the docker daemon. Docker compose will run the front-end and the back-end at the same time.

## Usage

```
docker-compose up
```

**Visit page website:** http://localhost:3000/

**API health check:** http://localhost:5001/up

## Running the tests

It's never too early to begin running unit tests. Tests are run using [RSpec](https://github.com/rspec/rspec-rails) testing framework and lives in the /spec folder. To run the tests:

```
docker-compose run --rm -e RAILS_ENV=test api bundle exec rspec
```

## Todos
- [x] Configure docker
- [x] Configure docker compose for the web and API
- [x] Configure rails API
- [x] Create employee List page
- [x] Create employee details page
- [x] Add `Antd` UI Library to build the page
- [x] Add VCR to help with request tests using real data
- [x] Create services responsible to fetch employees data in the back-end
- [x] Improve UI error handling and loading state using react query
- [ ] Configure cypress to test the UI
- [ ] Configure cache in the query client (react query)
- [ ] Configure CI
- [ ] Deploy to Heroku