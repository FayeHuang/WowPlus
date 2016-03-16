import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import {
  Spacing,
  Typography,
} from 'material-ui/lib/styles'
import HardWareSimCard from 'material-ui/lib/svg-icons/hardware/sim-card'
import HardWareMemory from 'material-ui/lib/svg-icons/hardware/memory'
import HardWareDeveloperBoard from 'material-ui/lib/svg-icons/hardware/developer-board'
import NavLink from './NavLink'


const muiTheme = getMuiTheme({
    zIndex: {
    	appBar: 1101,
    	leftNav: 1100,
    },
    leftNav: {
    	width: '200px',
    },
});

export default class Hello extends React.Component {
	static propTypes = {};

    static defaultProps = {};
    
    constructor(props) {
        super(props);
        this.state = {};
        this.styles = {
        	logo: {
				cursor: 'pointer',
		        fontSize: 24,
		        color: Typography.textFullWhite,
		        lineHeight: `${Spacing.desktopKeylineIncrement}px`,
		        fontWeight: Typography.fontWeightLight,
		        paddingLeft: Spacing.desktopGutter,
		        marginBottom: 8,
        	},
        };
    }

    render() {
    	return (
    		
    		<MuiThemeProvider muiTheme={muiTheme}>
    			<div>
	        		<AppBar
					    title="DataGo"
					    showMenuIconButton={false}
					/>
					<LeftNav open={true}>
						<div style={this.styles.logo}>
          					DataGo
        				</div>
        				<NavLink to="/disk">
        					<MenuItem primaryText="Disk" leftIcon={<HardWareSimCard />} checked={true}/>
        				</NavLink>
        				
        				<NavLink to="/cpu">
        					<MenuItem primaryText="CPU" leftIcon={<HardWareDeveloperBoard />} />
        				</NavLink>

        				<NavLink to="/memory">
        					<MenuItem primaryText="Memory" leftIcon={<HardWareMemory />} />
        				</NavLink>
		            </LeftNav>
		            {this.props.children}
	            </div>
       		</MuiThemeProvider>
       		
    	)
  	}
}