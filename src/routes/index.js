import {Route, /*IndexRoute*/} from 'react-router'
import React from 'react'
import KnowledgeBase from './KnowledgeBase'

const getRoutes = () => {
  return (
    <Route
      path="/"
      component={KnowledgeBase}
      prepareData={KnowledgeBase.prepareData}
    />
  )
}


export default getRoutes