import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadPainterContribute} from "../../redux/modules/models/PainterContribute";
import Avatar from "../../components/Avatar/Avatar";

@connect(
  (state) => ({
    profile: state.models.profile,
    painterContribute: state.models.painterContribute,
    component: state.containers.PainterContribute
  }),
  dispatch => bindActionCreators({
    loadPainterContribute
  }, dispatch)
)

export default class PainterContribute extends Component {
  static propTypes = {
    loadPainterContribute: PropTypes.func,
    profile: PropTypes.object,
    painterContribute: PropTypes.object,
    tagType: PropTypes.string,
    tagName: PropTypes.string,
    component: PropTypes.object
  };

  componentDidMount() {
    this.loadPainterContribute();
  }

  componentDidUpdate() {
    if (!this.props.component.loading && !this.props.component.loaded) {
      this.loadPainterContribute();
    }
  }

  loadPainterContribute(){
    const{tagType, tagName}=this.props;
    const {loading} = this.props.component;
    if (loading) return;
    this.props.loadPainterContribute(tagType, tagName);
  }

  render() {
    const{painterContribute, profile, component} =this.props;

    return (<div>
        <label>标签贡献者</label>
        {component.loaded ?
          component.indexes.map((id)=>
            <div key={"painterContribute"+id}>
              <span>{profile[painterContribute[id].profile].nickname}</span>
              <Avatar avatar={profile[painterContribute[id].profile].avatar} width={20}/>
              <span>{Math.round(painterContribute[id].point)}</span>
            </div>
          )
          : ''}
      </div>
    )
  }
}
