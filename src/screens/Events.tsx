import * as shape from 'd3-shape';
import React, { Dispatch } from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';

import {Line} from 'react-native-svg';
import {LineChart, Path} from 'react-native-svg-charts';

import {Block, CardList, Text} from '../components';
import * as theme from '../constants/theme';
import * as mocks from '../mocks';

import {connect, ConnectedProps} from 'react-redux';
import {types, actions} from '../store';

const mapStateToProps = (state: types.RootState) => ({
  events: state.events.events
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getEvents: () => dispatch(actions.events.getEvents()),
});

const connecter = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connecter>

export interface TournamentPageProps {
  type: string;
  user: any;
  chart: Array<number>;
  
}

type Props = TournamentPageProps & PropsFromRedux;

class Events extends React.Component<Props, {}> {
  componentDidMount() {
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
          strokeWidth: 1.25,
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
          strokeWidth={1}
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
            <Text h3 white style={{marginRight: -(25 + 5)}}>
              Events
            </Text>
          </Block>
          <Image style={styles.avatar} source={user.avatar} />
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
            <Text caption light>
              Matches
            </Text>
            <Text caption light>
              Days
            </Text>
          </Block>
          <Block flex={1}>{this.renderChart()}</Block>
        </Block>
      </Block>
    );
  }
  public static defaultProps = {
    type: 'Event',
    user: mocks.user,
    chart: mocks.chart,
    events: []
  };

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        {this.renderHeader()}
        <CardList {...this.props} />
      </SafeAreaView>
    );
  }
}

// const mapDispatchToProps = (dispatch: ReactReduxContextValue.)
export default connecter(Events);
const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: theme.colors.primary},
  headerChart: {paddingTop: 30, paddingBottom: 30, zIndex: 1},
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    marginRight: 5,
  },
});
