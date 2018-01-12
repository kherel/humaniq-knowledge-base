import React, {Component} from 'react'
import KnowledgeBaseContainer from 'components/pages/KnowledgeBase/container'
import {fetchPostmanApi} from 'store/entities/postmanApi/actions'
//import initialLoad from 'utils/initialLoad'


class KnowledgeBaseRoute extends Component {

  static prepareData({dispatch}) {
    // if(initialLoad()) return;
    return(
      dispatch(fetchPostmanApi())
    )
  }
  render() {
    return (
      <KnowledgeBaseContainer />
    )
  }
}

export default KnowledgeBaseRoute