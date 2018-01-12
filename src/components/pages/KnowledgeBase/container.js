import {connect} from 'react-redux';
import page from './page'

function mapStateToProps( state ) {
  const { postmanApi } = state

  return {articles: postmanApi.articles, loading: postmanApi.loading, loaded: postmanApi.loaded};
}

export default connect(mapStateToProps)(page);