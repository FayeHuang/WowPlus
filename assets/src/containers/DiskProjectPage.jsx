import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// import ProjectDetail from '../components/ProjectDetail'
import { 
  changeSortItem, 
  searchProject,
} from '../actions'

class DiskProjectPage extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    sortItem: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,

    // optional
    dispatch: PropTypes.func.isRequired,
    reduxState: PropTypes.object,
  }
  
  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) )
  }

  constructor(props) {
    super(props)
  }

  handleSortCheck(value) {
    this.props.dispatch(changeSortItem(value))
  }

  handleSearchInput(value) {
    this.props.dispatch(searchProject(value))
  }

  render() { 
    const { data, sortItem, filter, reduxState } = this.props
    // react-router parameter
    const { projectID } = this.props.params
    
    if (!data.hasOwnProperty('projects')) {
      return <div className="page">no data ...</div>
    }
    else {
      const projectData = data.projects.find(p => {
        if (p.entity_id == projectID)
          return p
      })

      return (
        <div className="page">
          <div style={{fontSize:36}}>{projectData.name}</div>
          {/*
          <ProjectDetail
            data={projectData}
            sortItem={sortItem} 
            filter={filter}
            handleSortCheck={this.handleSortCheck}
            handleSearchInput={this.handleSearchInput} 
          />
          */}
          
          {/*
          <pre>
            project data = { JSON.stringify(projectData, null, 2) }
          </pre>
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
}


function mapStateToProps(state) {
  const { usageData, projectDetailPage } = state
  return {
    data: usageData.data,
    sortItem: projectDetailPage.sortItem,
    filter: projectDetailPage.filter,
    reduxState: state
  }
}

export default connect(mapStateToProps)(DiskProjectPage)