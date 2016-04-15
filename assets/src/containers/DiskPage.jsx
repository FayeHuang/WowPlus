import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import Divider from 'material-ui/lib/divider'

import PageHead from '../components/PageHead'
// import DiskDetail from '../components/DiskDetail'

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
    isLoadingData: PropTypes.bool.isRequired, 

    dispatch: PropTypes.func.isRequired,
    reduxState: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this._bind( 'handleSortCheck', 'handleSearchInput' )
  }

  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) )
  }

  componentDidMount() {
    this.props.dispatch(fetchUsageData())
  }

  handleSortCheck(value) {
    this.props.dispatch(changeSortItem(value))
  }

  handleSearchInput(value) {
    this.props.dispatch(searchProject(value))
  }

  render() {
    const { data, isLoadingData, sortItem, filter, reduxState } = this.props
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
        <DiskDetail 
          data={data}
          isLoadingData={isLoadingData} 
          sortItem={sortItem} 
          filter={filter}
          handleSortCheck={this.handleSortCheck} 
          handleSearchInput={this.handleSearchInput} 
        />
        */}
        

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
    isLoadingData: usageData.isFetching,
    sortItem: projectOverviewPage.projectSortItem,
    filter: projectOverviewPage.projectFilter,
    reduxState: state
  }
}

export default connect(mapStateToProps)(DiskPage)