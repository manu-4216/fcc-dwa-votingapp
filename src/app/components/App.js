var React = require('react');
var Header = require('header/components/Header');
var Content = require('content/components/Content');

require('../style/main.scss');

var App = function(props) {
  return (
    <div>
      <Header />
      <Content />
    </div>
  )
};

module.exports = App;
