import React, {Component, PropTypes} from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import {connect} from "react-redux";
import {logSearch} from "../redux/modules/containers_mobile/searchInfo";
import {doSearch} from "../redux/modules/containers_mobile/searchResult";
import _ from "lodash";


export default class SearchResult extends Component {

  static propTypes = {
    logSearch: PropTypes.func
  };

  componentWillMount() {
  }

  constructor() {
    super();
    this.debounceDoSearch = _.debounce((value)=> {
      if (value) {
        this.props.doSearch(value);
      }
    }, 1500);
  }

  handleLogSearch(searchResult) {
    this.props.logSearch(searchResult);
    this.debounceDoSearch(searchResult);

  }


  render() {
    const {component} = this.props;
    const {isSearching, results, count} = component;
    const resultGroups = _.groupBy(results, 'modelType');
    console.log(resultGroups);
    return (<View>
        <TextInput style={styles.input} placeholder='搜索' onChangeText={this.handleLogSearch.bind(this)}/>
        <View>
          {count == 0 ? <View>
            <Text style={styles.result}>还没有相关结果</Text>
          </View> : <View>
            {resultGroups.PaintingTag &&
            <View>
              <Text style={styles.label}>标签</Text>
              <ScrollView style={styles.scrollView}>
                {resultGroups.PaintingTag.map((tag)=><View>
                  <Text style={styles.result}>{tag.name} : {tag.type}</Text>
                </View>)}
              </ScrollView>
            </View>}
            {resultGroups.Painting &&
            <View>
              <Text style={styles.label}>画作</Text>
              <ScrollView style={styles.scrollView}>

                {resultGroups.Painting.map((painting)=><View>
                  <Text style={styles.result}>{painting.title}</Text>
                </View>)}
              </ScrollView>
            </View>}
            {resultGroups.Profile &&
            <View>
              <Text style={styles.label}>用户</Text>
              <ScrollView style={styles.scrollView}>
                {resultGroups.Profile.map((profile)=><View>
                  <Text style={styles.result}>{profile.nickname}</Text>
                </View>)}
              </ScrollView>
            </View>}
          </View>
          }
        </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  label:{
    fontSize: 20,
    color: '#48BBEC',
  },
  input: {
    height: 36,
    padding: 4,
    margin: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  result: {
    fontSize: 18
  },
  scrollView:{
    height: 100
  }
});


export default connect(
  (state, ownProps) => ({
    component: state.containers.searchResult,
  }),
  {
    logSearch,
    doSearch
  }
)(SearchResult);
