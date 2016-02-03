import React from 'react';

export default class Hello extends React.Component {

    static propTypes = {};

    static defaultProps = {};
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
    	return ( <h1>Hello, World !!</h1> );
  	}
}