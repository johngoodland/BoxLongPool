'use strict';
var request = require('request');
var url = '';

const token = 'rJdQR7uairkh1Z5yEB0T5JpcKtkC5BVj'; 
const header = {
  'Authorization': 'Bearer ' + token  
}


var getUrl = function () {
  let options = {
    method: 'OPTIONS',
    url: 'https://api.box.com/2.0/events',
    headers: header
  }
 
 request(options, function(err, res, body) {
    if (res.statusCode !== 200 || err) {
      console.log('error with url - token expired?')      
      return;
    }
    url = JSON.parse(body).entries[0].url;
    console.log('real url:' + url); 
    getStart();
 });
}

var getStart = function () {
  let options = {
    url: 'https://api.box.com/2.0/events',
    qs: {
      'stream_position': 'now'
    },
    headers: header
  }

  request.get(options, function(err, res, body) {
    if (res.statusCode !== 200 || err) {
      console.log('error getting start position!')            
      return;
    }
    poll(JSON.parse(body).next_stream_position);
  });
}

 var poll = function(position) {  
  let body;
  let options = {
    url: `${url}&stream_position=${position}`,
    headers: header
  }

  console.log('long polling...');

  request.get(options, function(err, res, body) {   
    if (res.statusCode !== 200 || err) {
      console.log('error with olling')      
      return;
    }

    body = JSON.parse(body);
    console.log(body.message);    

    getEvent(position);

  });
}
var getEvent = function(position) {
  let body;
  let options = {
    url: 'https://api.box.com/2.0/events',
    qs: {
      'stream_position': position
    },
    headers: header
  }

  console.log('getting events');

  request.get(options, function(err, res, body) {
    if (res.statusCode !== 200 || err) {
      console.log('error with event')      
      return;
    }

    body = JSON.parse(body);    

    console.log(`${body.entries[0].event_id} | ${body.entries[0].event_type}`);
    getStart();
  })
}

getUrl();