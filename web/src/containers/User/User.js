import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadUser} from "../../redux/modules/models/User";
import {Link} from "react-router";
import "./User.scss";
import classNames from "classnames";
import Helmet from "react-helmet";
import {resize, calculateHeat} from "../../utils/common";
import InlineSVG from "svg-inline-react";

@connect(
  (state) => ({
    component: state.containers.User,
    user: state.models.profile,
    profileHeat: state.models.profileHeat,
    waypoint: state.waypoint
  }),
  dispatch => bindActionCreators({
    loadUser
  }, dispatch)
)


export default class Tags extends Component {
  static propTypes = {
    loadUser: PropTypes.func,
    user: PropTypes.object,
    component: PropTypes.object,
    profileHeat: PropTypes.object,
    waypoint: PropTypes.object
  };

  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
    this.waypointOnEnter = this.waypointOnEnter.bind(this);
  }

  componentDidMount() {
    this.loadMore();
  }

  componentWillReceiveProps(nextProps) {
    const currentWaypoint = this.props.waypoint;
    const nextWaypoint = nextProps.waypoint;
    if (currentWaypoint.currentPosition != 'inside' &&
      (nextWaypoint.currentPosition == 'inside')) {
      this.waypointOnEnter();
    }
  }

  componentDidUpdate() {
    if (!this.props.component.loading && !this.props.component.loaded) {
      this.loadMore();
    }
  }

  loadMore() {
    const {pageMeta, loading} = this.props.component;
    if (loading || !pageMeta.next) return;
    this.props.loadUser(pageMeta.next);
  }

  waypointOnEnter() {
    const {pageMeta} = this.props.component;
    if (pageMeta.current === 0 || pageMeta.current % 3) {
      this.loadMore();
    }
  }


  render() {
    const {user, component,profileHeat} = this.props;
    const {pageMeta, loading}=this.props.component;
    const isLastPage = !pageMeta.next;
    console.log(+Date.now());
    return (<div className="UserPage">
      <Helmet
        title="画手 - 恋绘·星祈"
      />
      <div> {component.loaded ?
        <div className="collections">
          { component.indexes.map((userId)=>
            user[userId].first_painting?
              <Link to={'/u/' + userId} className="paintingCollection" key={userId}>
                {user[userId].banner ?
                  <span className="img" style={{backgroundImage: `url(${resize(user[userId].banner, 240)})`}}/> :
                  <InlineSVG className="svg" src={require("../../utils/assets/default_banner.svg")}/>}
                <Link className="name" to={'/u/' + userId}>
                  <h2>{user[userId].nickname}</h2>
                </Link>
                <h4 className="type"/>
                <h2 className="heat">
                  <i className="zmdi zmdi-fire"/> {calculateHeat(profileHeat[user[userId].heat])}°
                </h2>
              </Link> :''
          )}
          <button
            onClick={this.loadMore}
            className={classNames("button hollow PaintingList__pageButton", {disabled: isLastPage}) }>
            { loading ? '载入中...' : (isLastPage ? '已到最后一页' : '载入更多') }
          </button>
        </div>
        : ''
      }
      </div>
    </div>);
  }
}
