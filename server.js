#!/usr/bin/env node

var _ = require('lodash');
var cors = require('cors');
var express = require('express');
var pg = require('pg');

var config = {
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);

// Get numbers as numbers
var types = require('pg').types;
types.setTypeParser(20, function(val) {
  return parseInt(val, 10);
});

var app = express();

app.use(cors());

function pgError(error) {
  console.log("PG error", error);
}

app.get('/ntee/:ntee', function (req, res) {
  var ntee = req.params.ntee;
  var bmf = pool.query("select * from eo_mi_bmf_080816 left join combined on eo_mi_bmf_080816.ein=combined.ein where city='DETROIT' and ntee=($1)",
    [ntee])
  .then(function(data) {
    var rows = _.groupBy(data.rows, 'NAME');
    res.send(rows);
  })
  .catch(pgError);
});

app.get('/ein/:ein', function (req, res) {
  var ein = req.params.ein;
  var combined = pool.query('select * from combined where ein=($1)', [ein]);
  var bmf = pool.query('select * from eo_mi_bmf_080816 where ein=($1)', [ein]);

  Promise.all([bmf, combined])
  .then(function(data) {
    res.send({
      bmf: data[0].rows,
      combined: data[1].rows
    });
  })
  .catch(pgError);

});

var host = process.env.HOST || undefined;
app.listen(process.env.PORT, host, function () {
  console.log('Example app listening on port ' + process.env.PORT);
});
