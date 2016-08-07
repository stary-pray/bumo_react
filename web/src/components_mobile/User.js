import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import {connect} from "react-redux";
import {loadUser} from "../redux/modules/models/User";

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class User extends Component {

  static propTypes = {
    painting:PropTypes.object
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
    return (<View>
      {rowData.first_painting ?
      <TouchableHighlight onPress={()=>this.rowPressed(rowData.id)}
                          underlayColor='#dddddd'>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{uri: rowData.avatar}}/>
          <Text style={styles.title}>{rowData.nickname}</Text>
        </View>
      </TouchableHighlight>:<View/>}
      </View>
    );
  }

  rowPressed(userId){
    const {user}=this.props;
    var userNickname = user[userId].nickname;

    this.props.navigator.push({
      title:userNickname,
      name: userNickname,
      screen: 'bumo.UserPainting',
      passProps:{UserId: userId}
    })
  }


  render(){
    const {component, user}=this.props;
    var orderUser= component.loaded
      ? component.indexes.map((userId)=> user[userId])
      : [];

    console.log(component);
    const source = dataSource.cloneWithRows(orderUser);
    return (
      <ListView dataSource={source}
                renderRow={this.renderRow.bind(this)}
                onEndReached={this.loadMore.bind(this)}
      />
    )
  }

}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
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
