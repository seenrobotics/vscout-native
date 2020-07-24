import * as shape from 'd3-shape';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, View, Button} from 'react-native';
import {NavigationTabProp} from 'react-navigation-tabs';

import {Line} from 'react-native-svg';
import {LineChart, Path} from 'react-native-svg-charts';

import {Block, Text, Header} from '../components';
import {CardList} from '../components/events';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';
import {types, actions} from '../store';
import {connect} from 'react-redux'; 
const {addEvents, getEvents } = actions.events;
const { getUser} = actions.user;
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
    chart: mocks.chart2,
    user: mocks.user,
  };
  componentDidMount() {
    this.props.getEvents();
  }

  renderChart() {
    const {chart} = this.props;
    return (
      <LineChart
        yMin={0}
        yMax={20}
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
          y1="100%"
          y2="100%"
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
      <Header pageName="Events" flex={0.42} column style={{paddingHorizontal: 15}}>
        <Block card shadow color="white" style={styles.headerChart}>
          <Block row space="between" style={{paddingHorizontal: 30}}>
            <Block flex={false} row center>
              <Text h1>6.4 </Text>
            </Block>
            <Block flex={false} row center>
              <Text h1>5  </Text>
            </Block>
          </Block>
          <Block flex={0.5} row space="between" style={{paddingHorizontal: 30}}>
            <Text caption light>Avg. Event Placement</Text>
            <Text caption light style={{marginRight:15}}>Events</Text>
          </Block>
          <Block flex={1}>{this.renderChart()}</Block>
        </Block>
      </Header>
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
