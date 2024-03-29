import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Screen} from '../../../navigation';
import {Colors, DefaultStyles, FontWeight} from '@degenwallet/styles';
import {FormListItem} from '@degenwallet/views';
import {CurrencyList} from '@degenwallet/types';
import {settingsSetCurrency} from '@degenwallet/redux';
import {useAppDispatch} from '@degenwallet/store';
import {SettingsScreenParamList} from '../../../navigation/SettingsStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type Props = {
  navigation: NativeStackNavigationProp<SettingsScreenParamList, Screen.CURRENCY>;
};

export const CurrencyScreen: React.FC<Props> = ({navigation}) => {
  const items = CurrencyList;
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={DefaultStyles.list}
        data={items}
        renderItem={({item}) => (
          <FormListItem
            title={item}
            onPress={() => {
              dispatch(settingsSetCurrency(item)).then(_ => {
                navigation.pop();
              });
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
  header: {
    margin: 32,
    alignItems: 'center',
  },
  logo: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  name: {
    marginTop: 12,
    color: Colors.WHITE,
    fontWeight: FontWeight.SEMI_BOLD,
    fontSize: 26,
  },
  version: {
    marginTop: 6,
    color: Colors.GRAY,
  },
});
