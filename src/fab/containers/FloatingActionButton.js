var React = require('react');
require('../style/main.scss');

class FloatingActionButton extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div  key={1} className='add-button magic-circle pulse' key={1} onClick={this.props.handleClick} >
  			     <span className='add-button--text'>+</span>
		    </div>
        )
    }
}

module.exports = FloatingActionButton
