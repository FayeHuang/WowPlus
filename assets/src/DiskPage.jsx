import React from 'react'
import PageHead from './PageHead'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'

export default class DiskPage extends React.Component {
	static propTypes = {};

    static defaultProps = {};
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
    	return (
            <div className="page">
                <PageHead   title="Disk Usage"
                            dateTime="2016/03/03 10:23"
                            subTitle={
                                <div style={{display:'flex'}}>
                                    統計類別：
                                    <RadioButtonGroup name="dataType" 
                                                      defaultSelected="project" 
                                                      style={{ display:'flex', 
                                                               flexDirection:'row',
                                                               minWidth:'100px',
                                                               maxWidth:'130px'
                                                            }}>
                                        <RadioButton
                                            value="project"
                                            label="專案"
                                        />
                                        <RadioButton
                                            value="business"
                                            label="業務類別"
                                        />
                                    </RadioButtonGroup>
                                </div>
                            }
                />    		    
            </div>
    	)
    }
}