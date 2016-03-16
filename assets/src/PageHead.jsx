import React from 'react'
import LastUpdateTime from './LastUpdateTime'

export default class PageHead extends React.Component {
	static propTypes = {
		// required
		title: React.PropTypes.string.isRequired,
		dateTime: React.PropTypes.string.isRequired,

		// primitives, optional by default
		subTitle: React.PropTypes.any,
	};

    static defaultProps = {};
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
    	return (
            <div>
    			<span style={{ fontSize:36, paddingRight:'20px' }}>{this.props.title}</span>
    			<LastUpdateTime dateTime={this.props.dateTime} />
    			{this.props.subTitle} 
            </div>
    	)
    }
}