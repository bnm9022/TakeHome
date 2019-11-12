require('./models/database');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const Handlebars = require('handlebars');
const moment = require('moment');

const employeeController = require('./controllers/employeeController/employeeRouter');
const employeeApiController = require('./controllers/employeeApiController/employeeApiRouter');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/employees', employeeController);
app.use('/api/employees', employeeApiController);

Handlebars.registerHelper('formatTime', function (date, format) {
    return moment(date).format(format);
});