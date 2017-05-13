var axios = require('axios');

var helpers = {
    getAll: function() {
        return axios.get('/polls')
            .then(function (response) {
                console.log(response.data[0]);
            })
            .catch(function (err) {
                console.warn('Error in /polls', err);
            })
    }
};


module.exports = helpers;
