import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image, Dimensions} from "react-native";
import {connect} from "react-redux";
import {loadUser} from "../redux/modules/models/User";
import {calculateHeat} from "../utils/common";
import Icon from "react-native-vector-icons/MaterialIcons";

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class User extends Component {

  static propTypes = {
    painting: PropTypes.object
  };

  componentWillMount() {
    this.loadMore();
  }

  loadMore() {
    const {pageMeta, loading} = this.props.component;
    if (loading || !pageMeta.next) return;
    this.props.loadUser(pageMeta.next);
  }

  renderRow(rowData, sectionID, rowID) {
    const {profileHeat} = this.props;
    console.log(rowData.avatar);
    const windowWidth = Dimensions.get('window').width;
    const heatObj = profileHeat[rowData.heat];
    return (
      <TouchableHighlight onPress={()=>this.rowPressed(rowData.id)}
                          underlayColor='#dddddd'>
        <View style={styles.rowContainer}>
          {rowData.banner ? <Image style={{
            width: windowWidth - 20,
            height: 200
          }}
                                   resizeMode={Image.resizeMode.cover}
                                   source={{uri: rowData.banner}}/>
            : <Image style={{
            width: windowWidth - 20,
            height: 200
          }} resizeMode={Image.resizeMode.cover}
                     source={require("../utils/assets_mobile/default_banner.png")}/>}

          {rowData.avatar ? <Image style={styles.avatar} source={{uri: rowData.avatar}}/> :
            <Image style={styles.avatar} source={require("../utils/assets_mobile/default_avatar.png")}/>}
            <Text style={styles.title}>{rowData.nickname}</Text>
            <Text style={styles.heat}>
              <Icon name="whatshot" color={'#EE634C'}/>
              {Math.round(calculateHeat(heatObj))}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  rowPressed(userId) {
    const {user}=this.props;
    var userNickname = user[userId].nickname;

    this.props.navigator.push({
      screen: 'bumo.UserPainting',
      navigatorStyle: {
        navBarHideOnScroll: true, // make the nav bar hidden only after the user starts to scroll
        navBarTranslucent: true,
      },
      passProps: {UserId: userId}
    })
  }


  render() {
    const {component, user}=this.props;
    var orderUser = component.loaded
      ? component.indexes.map((userId)=> user[userId])
      : [];
    const source = dataSource.cloneWithRows(orderUser);
    return (

      <ListView
        style={{
          paddingTop: 25,
          flex: 1, backgroundColor: '#EFEFF4', padding: 10
        }}
        dataSource={source}
        renderRow={this.renderRow.bind(this)}
        onEndReached={this.loadMore.bind(this)}
      />
    )
  }

}

const styles = StyleSheet.create({

  rowContainer: {
    width: Dimensions.get('window').width - 20,
    height: 300,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    shadowColor: '#8F8E94',
    shadowOffset: {x: 0, y: 5},
    shadowRadius: 2,
    shadowOpacity: 0.2,
    borderStyle: 'solid',
    alignItems: 'center',

  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    position: 'absolute',
    top: 168,
    left: Dimensions.get('window').width / 2 - 42
  },
  title: {
    marginTop: 42,
    fontSize: 20,
    color: '#16A085',
  },
  heat: {
    marginTop: 10,
    fontSize: 14,
    color: '#EE634C'
  }
});

export default connect(
  (state, ownProps) => ({
    profileHeat: state.models.profileHeat,
    painting: state.models.painting,
    user: state.models.profile,
    component: state.containers.user
  }),
  {
    loadUser
  }
)(User);
