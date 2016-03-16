import React from 'react'

export default class PageHead extends React.Component {
	static propTypes = {
		// required
		dateTime: React.PropTypes.string.isRequired,
	};

    static defaultProps = {};
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
    	return (
            <div  style={{ float:'right' }}>
    			最後更新時間：{this.props.dateTime}
            </div>
    	)
    }
}