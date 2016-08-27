# Ledger 990 Data API

## Install

`npm install`

## Configure

Copy `sample.env` to `.env` and fill in the connection details. Before starting
the server, run `source .env` to export the variables to your local environment.

## Run

`node server.js`

## Use

### GET /ein/:ein

Get all data for an EIN

### GET /ntee/:ntee

Get all organizations in Detroit with a specific NTEE code (eg "P20"). Results
are grouped by organization name.
