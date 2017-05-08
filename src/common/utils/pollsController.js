var axios = require('axios');

module.exports = {
    getAll: axios.get('/polls')
    .then(function (response) {
        //console.log(response.data[0]);
        this.setState({
            polls: response.data
        })
    }.bind(this))
    .catch(function (err) {
        throw err
    });
}
