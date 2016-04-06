import fetch from 'isomorphic-fetch'

export const REQUEST_USAGE_DATA = 'REQUEST_USAGE_DATA'
export const RECEIVE_USAGE_DATA = 'RECEIVE_USAGE_DATA'

export const CHANGE_SORT_ITEM = 'CHANGE_SORT_ITEM'
export const SEARCH_PROJECT = 'SEARCH_PROJECT'

export const OPEN_PROJECT_HISTORY_DIALOG = 'OPEN_PROJECT_HISTORY_DIALOG'
export const CLOSE_PROJECT_HISTORY_DIALOG = 'CLOSE_PROJECT_HISTORY_DIALOG'

export const REQUEST_HISTORY_DATA = 'REQUEST_HISTORY_DATA'
export const RECEIVE_HISTORY_DATA = 'RECEIVE_HISTORY_DATA'
export const CHANGE_HISTORY_PERIOD = 'CHANGE_HISTORY_PERIOD'

// time 
export const MONTH = 'month'
export const YEAR = 'year'
export const DAY = 'day'
export const HOUR = 'hour'
export const MINUTE = 'minute'
export const CUSTOM = 'custom'


function requestUsageData() {
  return {
    type: REQUEST_USAGE_DATA
  }
}

function receiveUsageData(json) {
  return {
    type: RECEIVE_USAGE_DATA,
    usage: json
  }
}

export function fetchUsageData() {
  return dispatch => {
    dispatch(requestUsageData())
    return fetch('/api/usage/disk')
      .then(response => response.json())
      .then(json => dispatch(receiveUsageData(json)))
  }
}

function requestHistoryData(entityId) {
  return {
    type: REQUEST_HISTORY_DATA,
    id: entityId
  }
}

function receiveHistoryData(json) {
  return {
    type: RECEIVE_HISTORY_DATA,
    usage: json
  }
}

export function fetchHistoryData(id) {
  return dispatch => {
    dispatch(requestHistoryData(id))
    return fetch(`/api/usage/disk/${id}/chart`)
      .then(response => response.json())
      .then(json => dispatch(receiveHistoryData(json)))
  }
}

export function changeSortItem(item) {
  return {
    type: CHANGE_SORT_ITEM,
    item: item
  }
}

export function searchProject(filter) {
  return {
    type: SEARCH_PROJECT,
    filter: filter
  }
}

export function openProjectHistoryDialog(value) {
  const { entityId, title } = value
  return {
    type: OPEN_PROJECT_HISTORY_DIALOG,
    entityId: entityId,
    title: title
  }
}

export function closeProjectHistoryDialog() {
  return {
    type: CLOSE_PROJECT_HISTORY_DIALOG
  }
}

export function changeHistoryPeriod(value) {
  const { period, interval } = value
  return {
    type: CHANGE_HISTORY_PERIOD,
    period: period,
    interval: interval
  }
}