import * as shape from 'd3-shape';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, View, Button} from 'react-native';
import {NavigationTabProp} from 'react-navigation-tabs';

import {Line} from 'react-native-svg';
import {LineChart, Path} from 'react-native-svg-charts';

import {Block, Text} from '../components';
import {CardList} from '../components/events';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {types, actions} from '../store';
import {connect} from 'react-redux'; 
const {addEvents, getEvents } = actions.events;
const { getUser } = actions.user;
interface OwnProps {
  type: string;
  chart: Array<number>;
  navigation:NavigationTabProp;
}
interface DispatchProps {
  getEvents: () => any;
  getUser: () => any;
  addEvents: ({events} : {events : Array<types.events.EventData>}) => any;
}
interface StateProps {
  events: Array<types.events.EventDoc>;
  user?: types.user.User;
}
type Props = OwnProps & DispatchProps & StateProps;

class Events extends React.Component<Props, {}> {
  public static defaultProps = {
    type: 'Event',
    chart: mocks.chart,
  };
  componentDidMount() {
    this.props.getUser();
    console.log(this.props.user);
    this.props.getEvents();
  }

  renderChart() {
    const {chart} = this.props;
    return (
      <LineChart
        yMin={0}
        yMax={10}
        data={chart}
        style={{flex: 2}}
        curve={shape.curveMonotoneX}
        svg={{
          stroke: theme.colors.primary,
          strokeWidth: 1.75,
        }}
        contentInset={{left: theme.sizes.base, right: theme.sizes.base}}>
        <Line
          key="zero-axis"
          x1="0%"
          x2="100%"
          y1="50%"
          y2="50%"
          stroke={theme.colors.gray}
          strokeDasharray={[2, 10]}
          strokeWidth={3}
        />
      </LineChart>
    );
  }

  renderHeader() {
    const {user} = this.props;
    return (
      <Block flex={0.42} column style={{paddingHorizontal: 15}}>
          <Block flex={false} row style={{paddingVertical: 15}}>
          <Block center>
            <Text h3 white style={{fontSize:21, marginRight: -(100 + 10 + 30)}}>
              Events
            </Text>
          </Block>
          <View style={{width:100, marginRight:10}}>
    <Text h4 white style={{fontSize:10, textAlign:'right'}}>{user?.userName}</Text>
            <Text h3 white style={{fontSize:15, textAlign:'right'}}>{user?.team}</Text>
          </View>
          <Image style={styles.avatar} source={user?.avatar} />
        </Block>
        <Block card shadow color="white" style={styles.headerChart}>
          <Block row space="between" style={{paddingHorizontal: 30}}>
            <Block flex={false} row center>
              <Text h1>291 </Text>
            </Block>
            <Block flex={false} row center>
              <Text h1>481 </Text>
            </Block>
          </Block>
          <Block flex={0.5} row space="between" style={{paddingHorizontal: 30}}>
            <Text caption light>Matches</Text>
            <Text caption light style={{marginRight:15}}>Days</Text>
          </Block>
          <Block flex={1}>{this.renderChart()}</Block>
        </Block>
        <Button
            title="Reload Data"
            onPress={() => this.props.getEvents()}
          />
      </Block>
    );
  }


  render() {
    return (
      <SafeAreaView style={styles.safe}>
        {this.renderHeader()}
        <CardList {...this.props} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: types.RootState) => ({
  events: state.events.events,
  user : state.user.user,
});

export default connect(mapStateToProps, { getEvents , addEvents, getUser })(Events);

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: theme.colors.primary},
  headerChart: {paddingTop: 30, paddingBottom: 30, zIndex: 1},
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 5,
  },
});
