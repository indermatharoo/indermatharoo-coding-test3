# Coding Challenge

Front-end React application that allows users to login and signup for medical enquires. The data will come via Api built-in Lumen. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

What things you need to install the software and how to install them
- Docker

## Installation

* Install [Docker](https://docs.docker.com/get-started/)
* Build: `docker-compose build`
* Run: `docker-compose up`

## Development
* Lumen backend: http://localhost:8001
* React frontend: http://localhost:8002

## Staging
* Lumen backend: "Staging URL here"
* React frontend: "Staging URL here"

## Production
* Lumen backend: "Live URL here"
* React frontend: "Live URL here"


##Frontend

#### Environment Variables 

The following environment variables need to be set up on the system.

- frontend/src/Config.js
```
global.apiUrl - set api url here(default value is already assigned).
```

##Backend

#### Environment Variables 

The following environment variables need to be set up on the system.

- backend/.env
```
API_URL - set api url here(default value is already assigned).
```

### Database Information

#### Applicants Table

- Table Name: `Users`
- Primary Hash Key: `id (Unsigned Integer)`

## Deployment

Add additional notes about how to deploy this on a live system.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Resources

* [React](https://reactjs.org/)
* [Lumen](https://lumen.laravel.com/)