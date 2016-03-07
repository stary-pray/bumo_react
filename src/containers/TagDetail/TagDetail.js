import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTagDetail} from 'redux/modules/models/TagDetail';
import {Link} from 'react-router';
import PaintingInfo from 'components/PaintingInfo/PaintingInfo';


@connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
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
    component: PropTypes.object,
    painting: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
  };


  componentWillMount() {
    this.props.loadTagDetail(this.props.name);
    console.log(this.props);
  }

  render() {
    const {loaded, tagId} = this.props.component;
    const {tagDetail, painting,paintingHeat} = this.props;
    return ( <div>
      {loaded ?
        <div>
          <h1>{tagDetail[tagId].name}</h1>
          <div>
            {tagDetail[tagId].paintings? tagDetail[tagId].paintings.map((paintingId) => (
              <PaintingInfo key={'painting' + paintingId} heat={paintingHeat[painting[paintingId].heat]}
                            painting={painting[paintingId]}/>)):''}
          </div>
        </div> : ''}
    </div>);
  }
}
