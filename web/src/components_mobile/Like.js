import {View, ListView, StyleSheet, Text, TextInput, TouchableHighlight} from "react-native";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {freeLike, payLike} from "../redux/modules/containers/LikeAction";

class Like extends Component {

  static propTypes = {
    painting:PropTypes.object,
    paintingId: PropTypes.number
  };


  handleFreeLike(){

    this.props.freeLike(this.props.paintingId)
  }

  handlePayLike(amount){
    this.props.payLike(this.props.paintingId, amount)
  }

  render(){
    return(
      <View>
      <Text>单纯的支持作品</Text>
        <TouchableHighlight style={styles.button}
                            underlayColor='#99d9f4' onPress={this.handleFreeLike.bind(this)}>
          <Text style={styles.buttonText}>Touch</Text>
        </TouchableHighlight>
        <Text>也支持一下作者</Text>
        <TouchableHighlight style={styles.button}
                            underlayColor='#99d9f4' onPress={this.handlePayLike.bind(this, 1)}>
          <Text style={styles.buttonText}>+1</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
                            underlayColor='#99d9f4' onPress={this.handlePayLike.bind(this,5)}>
          <Text style={styles.buttonText}>+5</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
                            underlayColor='#99d9f4' onPress={this.handlePayLike.bind(this,10)}>
          <Text style={styles.buttonText}>+10</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
                            underlayColor='#99d9f4' onPress={this.handlePayLike.bind(this,50)}>
          <Text style={styles.buttonText}>+50</Text>
        </TouchableHighlight>
        </View>
    )
  }

}
const styles = StyleSheet.create({

  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center'
  },

});

export default connect(
  (state, ownProps) => ({
    me: state.me,

  }),
  {
    freeLike,
    payLike
  }
)(Like);
