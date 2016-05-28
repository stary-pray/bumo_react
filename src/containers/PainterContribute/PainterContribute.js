import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router";
import {loadPainterContribute} from "../../redux/modules/models/PainterContribute";
import Avatar from "../../components/Avatar/Avatar";
import "./PainterContribute.scss";

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
    className: PropTypes.string,
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
    const{painterContribute, profile, component, className} =this.props;

    return (<li className={"PainterContribute__container " + className} >
        <div className="PainterContribute__wrapper">
          <label>画师贡献</label>
          {component.loaded ?
            component.indexes.filter((id)=> painterContribute[id].point > 0).map((id)=>
              <Link to={`/u/${profile[painterContribute[id].profile].user}`} className="PainterContribute__item " key={"painterContribute_"+id}>
                <Avatar className="PainterContribute__item-avatar" avatar={profile[painterContribute[id].profile].avatar} width={30}/>
                <span className="PainterContribute__item-nickname">{profile[painterContribute[id].profile].nickname}</span>
                <span className="PainterContribute__item-amount"> + {Math.round(painterContribute[id].point)}</span>
              </Link>
            ) : '' }
        </div> 
      </li>
    );
  }
}
