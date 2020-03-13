import React from 'react';
import Card from './';

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CardList = props => {
  const {data, type} = props;
  return (
    <Block flex={0.8} column color="gray2" style={styles.requests}>
      <Block flex={false} row space="between" style={styles.requestsHeader}>
        <Text light>Recent ${capitalize(type)}s</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text semibold>View All</Text>
        </TouchableOpacity>
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map(cardProps => (
          <TouchableOpacity activeOpacity={0.8} key={`${type}-${cardProps.id}`}>
            <Card {...cardProps} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Block>
  );
};

export default CardList;
