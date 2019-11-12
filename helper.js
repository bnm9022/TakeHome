const Request = require('request-promise');

const favJokeoptions = {
    url: 'https://icanhazdadjoke.com/',
    headers: {
        'User-Agent': 'request',
        'Accept': 'text/plain'
    }
};

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
};

module.exports = {
    getJoke: async function() {
        return await Request(favJokeoptions, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            var favoriteJoke = body;
            return favoriteJoke;
        }); 
    },
    getQuote: async function() {
        var favQuote = "";
        await Request("https://ron-swanson-quotes.herokuapp.com/v2/quotes", (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            favQuote = JSON.parse(body)[0];
        });
        return favQuote;
    },
    isValidDate: function(date) {
        return date != null && date.trim != "" && date.match(/^\d{4}-\d{2}-\d{2}$/);
    },
    isValidFormat: function(date) {
        if(date == null) {
            return false;
        }
        var value = formatDate(date);
        if (!value.match(/^\d{4}-\d{2}-\d{2}$/) || !date.getTime()) {
            return false;
        }
        return true;
    },
    handleValidationError: function(err, body) {
        for (field in err.errors) {
            switch (err.errors[field].path) {
                case 'firstName':
                    body['firstNameError'] = err.errors[field].message;
                    break;
                case 'lastName':
                    body['lastNameError'] = err.errors[field].message;
                    break;
                case 'hireDate':
                    body['hireDateError'] = err.errors[field].message;
                    break;
                case 'role':
                    body['roleError'] = err.errors[field].message;
                    break;
                default:
                    break;
            }
        }
    }
};
