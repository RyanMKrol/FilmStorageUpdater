# FilmStorageUpdater
A project to keep my list of movies, and the data around them, up to date!

## Usage
* Upload an updated list of movies to S3:
  * Bucket - `ryankrol-films`
  * File - `films.txt`
* On the first of every month, this program will run and fetch updated movie data for the above list of movies
* The new data will be uploaded to S3:
  * Bucket - `ryankrol-films`
  * File - `films_data.txt`

[![Build Status](https://travis-ci.org/RyanMKrol/FilmStorageUpdater.svg?branch=master)](https://travis-ci.org/RyanMKrol/FilmStorageUpdater)
