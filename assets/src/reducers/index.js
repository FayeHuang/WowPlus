import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { 
         REQUEST_USAGE_DATA, 
         RECEIVE_USAGE_DATA,
         CHANGE_SORT_ITEM,
         SEARCH_PROJECT,
         OPEN_PROJECT_HISTORY_DIALOG,
         CLOSE_PROJECT_HISTORY_DIALOG,
         REQUEST_HISTORY_DATA,
         RECEIVE_HISTORY_DATA,
         CHANGE_HISTORY_PERIOD
       } from '../actions'

import { MONTH, YEAR, DAY, HOUR, CUSTOM, MINUTE } from '../actions'

const initialState = {
  isFetching: false,
  projectSortItem: 'replica',
  dataPathSortItem: 'replica',
  data: {}
}


function usageData(state = { 
  isFetching: false, 
  data: {} 
}, action) {
  switch (action.type) {
    case REQUEST_USAGE_DATA:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USAGE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.usage
      })
    default:
      return state
  }
}

function historyData(state = {
  isFetching: false,
  data: {}
}, action) {
  switch (action.type) {
    case REQUEST_HISTORY_DATA:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_HISTORY_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.usage
      })
    default:
      return state 
  }
}

function projectOverviewPage(state = { 
  projectSortItem: 'replica', 
  projectFilter: ''
}, action) {
  switch (action.type) {
    case CHANGE_SORT_ITEM:
      return Object.assign({}, state, {
        projectSortItem: action.item
      })
    case SEARCH_PROJECT:
      return Object.assign({}, state, {
        projectFilter: action.filter
      })
    default:
      return state
  }
}

function historyDialog(state = {
  opened: false,
  title: '',
  entityId: null,
  period: MONTH,
  interval: DAY
}, action) {
  switch (action.type) {
    case OPEN_PROJECT_HISTORY_DIALOG:
      return Object.assign({}, state, {
        opened: true,
        title: action.title,
        entityId: action.entityId 
      })
    case CLOSE_PROJECT_HISTORY_DIALOG:
      return Object.assign({}, state, {
        opened: false
      })
    case CHANGE_HISTORY_PERIOD:
      return Object.assign({}, state, {
        period: action.period,
        interval: action.interval
      })
    default:
      return state 
  }
}

const rootReducer = combineReducers({
  usageData,
  projectOverviewPage,
  historyDialog,
  routing: routerReducer
})

export default rootReducer