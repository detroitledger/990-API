# Ledger 990 Data API

## Install

`npm install`

## Configure

Copy `sample.env` to `.env` and fill in the connection details. Before starting
the server, run `source .env` to export the variables to your local environment.

If you want to use with HTTPS, put your certifiates in the app's root directory
and name them `cert` and `key`. 

## Run

`node server.js`

## Use


### GET /orgs?eins=123,456,789

Get all data for a list of EINs.

Returns data in this format: 

```
[{
  info: { BMF data about the organization }
  data: [ List of extract data, including assets, revenue, etc]
}]

```

### GET /ein/:ein

Get all data for an EIN

### GET /ntee/:ntee

Get all organizations in Detroit with a specific NTEE code (eg "P20"). Results
are grouped by organization name.

## Data

* [Notes](https://docs.google.com/document/d/1N7V2kY0zFsJFAcM4nYBds23VmctVLt3iLR2GLpa9mXY/edit)
* [Field mappings](https://docs.google.com/spreadsheets/d/15nptmUybfM7VINf99RPz86jxegbPtoomhczOsBIuP2M/edit#gid=1622575326)
