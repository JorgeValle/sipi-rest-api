# Sipi REST API
The RESTful web api that powers Sipi, Latin America's urban app, https://sipi.app

- About Sipi REST API
- Motivation
- Getting started
- Security
- License

## About Sipi REST API

Sipi REST API is a web API powering an urban application site for Latin America, found at [https://sipi.app](https://sipi.app).

It's built through [Mongoose ODM](https://mongoosejs.com/) interacting with [MongoDB](https://www.mongodb.com/), and [Express](https://expressjs.com/) as the server framework.

Testing is done with [Jasmine](https://jasmine.github.io/), and documentation is generated with [ESDoc](https://esdoc.org/).

## Motivation

Many years ago, I operated a site called Sipi. It was a business review site for El Salvador, my birth country. Even though it was getting really good traffic, I was mostly leveraging libraries, frameworks and CMSs to run it. I did't write the backend; I was using other people's code.

As my skills have progressed over the years, I decided to design my own API, to prove to myself I could do it and to enjoy the architectural flexibility it affords.

The API is now in it's 4th version, and very stable.

## Getting started

Getting the app running locally is done in two steps.

```
set MONGOLAB_URI=YourMongoDatabaseConnectionString
```
Of course the schema in your database needs to match Sipi's. Because the schema is declared with Mongoose, you could just point to an empty database, and the code will create the database schema for you.

Once this environment variable is set, we can load up the app by running the following.

```
node app.js
```

## Security

The Sipi REST Api uses [Snyk](https://snyk.io) for automated vulnerability-finding. The repository strives to stay up to date and with 0 known vulnerabilities at all times.

[![Known Vulnerabilities](https://snyk.io/test/github/JorgeValle/sipi-rest-api/badge.svg)](https://snyk.io/test/github/JorgeValle/sipi-rest-api)

## License

Copyright 2019 Jorge Valle

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.