import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTagDetail} from 'redux/modules/models/TagDetail';
import {Link} from 'react-router';


@connect(
  (state, ownProps) => ({
    tagDetail: state.models.tagDetail,
    name: ownProps.params.tagName,
    component: state.containers.TagDetail
  }),
  dispatch => bindActionCreators({
    loadTagDetail
  }, dispatch)
)


export default class TagDetail extends Component {
  static propTypes = {
    name: PropTypes.string,
    tagDetail: PropTypes.object,
    loadTagDetail: PropTypes.func,
    component: PropTypes.object
  };



  componentWillMount(){
    this.props.loadTagDetail(this.props.name);
    console.log(this.props);
  }

  render() {
    const {loaded, tagId} = this.props.component;
    const {tagDetail} = this.props;
    return ( <div>{loaded ? ( <h1>{tagDetail[tagId].name}</h1>
    ):''}</div>);
  }
}
