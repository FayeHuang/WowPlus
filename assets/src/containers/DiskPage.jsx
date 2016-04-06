import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import Divider from 'material-ui/lib/divider'

import PageHead from '../components/PageHead'

import { 
  fetchUsageData, 
  changeSortItem, 
  searchProject,
  openProjectHistoryDialog,
  closeProjectHistoryDialog 
} from '../actions'

class DiskPage extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    sortItem: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,

    dispatch: PropTypes.func.isRequired,
    reduxState: PropTypes.object,
  }

  constructor(props) {
    super(props)
  }

  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) )
  }

  componentDidMount() {
    this.props.dispatch(fetchUsageData())
  }

  render() {
    const { data, sortItem, filter, reduxState } = this.props
    const isEmpty = !data.hasOwnProperty('last_updated')
    return (
      <div className="page">
        <PageHead
          title="Disk Page"
          subTitle={
            <div style={{display:'flex'}}>
              統計類別：
              <RadioButtonGroup 
                name="dataType" 
                defaultSelected="project" 
                style={{ 
                  display:'flex', 
                  flexDirection:'row',
                  maxWidth:'100px'
                }}>

                <RadioButton
                  value="project"
                  label="專案"
                />
                <RadioButton
                  value="business"
                  label="業務"
                />
              </RadioButtonGroup>
            </div>
          }
        /> 
        {/*
        <pre>
          redux state = { JSON.stringify(reduxState, null, 2) }
        </pre>
        */}  
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { usageData, projectOverviewPage } = state
  return {
    data: usageData.data,
    sortItem: projectOverviewPage.projectSortItem,
    filter: projectOverviewPage.projectFilter,
    reduxState: state
  }
}

export default connect(mapStateToProps)(DiskPage)