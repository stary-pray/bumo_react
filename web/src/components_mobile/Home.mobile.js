import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {load as loadPainting, loadHot as loadHotPainting} from "../redux/modules/models/Painting";
import PureListView from "./PureListView";
import {initialApp} from "../redux/modules/auth";
import Auth0Lock from "react-native-lock";
import {AUTH0_DOMAIN, AUTH0_CLIENT} from "../utils/common";


class Home extends Component {

  static propTypes = {
    painting: PropTypes.object,
    loadHotPainting: PropTypes.func,
    loadPainting: PropTypes.func,
    navigation: PropTypes.object,
  };

  componentWillMount() {
    this.props.initialApp();
    const lock = new Auth0Lock({clientId: AUTH0_CLIENT, domain: AUTH0_DOMAIN});
    setTimeout(()=> {
      lock.show({}, (err, profile, token) => {
        console.log('Logged in!', err, profile);
      });
    }, 3000);
  }


  render() {
    const {component, painting, loadPainting, profile, orderPainting, loadHotPainting,
    paintingHeat, navigation}=this.props;
    const load = orderPainting.orderType == '热门' ? loadHotPainting : loadPainting;
    const orderType = orderPainting.orderType == '热门' ? 'Hot' : 'Latest';
    return (
        <PureListView painting={painting}
                      component={component[orderType]}
                      orderType={orderType}
                      loadPainting={load}
                      navigator={this.props.navigator}
                      navigation={navigation}
                      profile={profile}
                      paintingHeat={paintingHeat}

        />

    )
  }

}


export default connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    me: state.me,
    component: state.containers.Home,
    profile: state.models.profile,
    orderPainting: state.containers.orderPainting,
    paintingHeat: state.models.paintingHeat
  }),
  {
    loadPainting,
    loadHotPainting,
    initialApp
  }
)(Home);
