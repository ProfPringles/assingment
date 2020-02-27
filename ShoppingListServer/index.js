const express = require('./config/express');

const app = express();

app.listen(3333, function() {
    console.log('Listening on port: 3333');
});