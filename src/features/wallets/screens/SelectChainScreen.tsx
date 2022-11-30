import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Props, Screen} from '@magicwallet/navigation';
import {Colors} from '@magicwallet/styles';
import {ChainList} from '@magicwallet/chain-types';
import {ChainView} from '../ChainView';

export const SelectChainScreen: React.FC<Props<Screen.SELECT_CHAIN>> = ({
  route,
  navigation,
}) => {
  const chains = ChainList;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chains}
        renderItem={({item}) => (
          <ChainView
            chain={item}
            onPress={() => {
              route.params.selectChain(item);
              navigation.pop();
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
});
