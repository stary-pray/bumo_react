import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadUser} from "../../redux/modules/containers/User";
import {Link} from "react-router";
import "./User.scss";

@connect(
  (state) => ({
    component: state.containers.User,
    user: state.models.profile,
    profileHeat: state.models.profileHeat,
  }),
  dispatch => bindActionCreators({
    loadUser
  }, dispatch)
)


export default class Tags extends Component {
  static propTypes = {
    loadUser: PropTypes.func,
    loadUserPaintingHot: PropTypes.func,
    user: PropTypes.object,
    component: PropTypes.object,
    profileHeat:PropTypes.object
  };

  componentWillMount() {
    this.props.loadUser();
  }


  render() {
    const {user, component,profileHeat} = this.props;
    return (<div className="UserPage">
      <div> {component.loaded ?
        <div className="collections">
          { component.indexes.map((userId)=> user[userId].first_painting?
          <div className="paintingCollection" key={userId}>
                <span className="img"
                      style={{backgroundImage: `url(${user[userId].first_painting.attachment})`}}/>
                <Link className="name" to={'/p/' +userId}>
                  <h2>{user[userId].nickname}</h2>
                </Link>
                <h4 className="type"/>
                <h2 className="heat">
                  <i className="zmdi zmdi-fire"/> {Math.round(profileHeat[user[userId].heat].point)}
                </h2>
          </div>:''
          /*
           <div key={"user"+userId}>
           <Link to={'/p/'+ userId}>
           <h1>{user[userId].nickname}</h1>
           <img src={user[userId].avatar}/>
           </Link>
           {component.hotPaintings[userId]? component.hotPaintings[userId].map(paintingId =>
           <PaintingInfo
           key={'painting' + paintingId}
           heat={paintingHeat[painting[paintingId].heat]}
           owner={user[userId]}
           painting={painting[paintingId]}/>
           ):''}
           </div>
          */
          )}
        </div>
        : ''
      }
      </div>
    </div>);
  }
}
