import React, {useEffect} from 'react';
import {FlatList, RefreshControl, SafeAreaView, StyleSheet} from 'react-native';
import {AssetListItem, WalletHeader} from '@degenwallet/views';
import {Asset} from '@degenwallet/chain-types';
import {Colors} from '@degenwallet/styles';
import {Wallet} from '@degenwallet/types';
import {WalletHeaderAction} from '@degenwallet/views/src/WalletHeader';
import {useAppDispatch, useAppSelector} from '@degenwallet/store';
import {GetAssetsSelector, GetTotalFiatValueSelector} from '../../../core/selectors/assets-selectors';
import {GetCurrentWallet} from '../../../core/selectors/wallets-selectors';
import {GetCurrencySelector} from '../../../core/selectors/settings-selectors';
import {WalletService} from '../wallet-service';
import {RouteProp} from '@react-navigation/core';
import {Screen, SelectAssetType} from '../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WalletStackParamList} from '../../../navigation/WalletStack';

export type Props = {
  route: RouteProp<WalletStackParamList, Screen.WALLET>;
  navigation: NativeStackNavigationProp<WalletStackParamList, Screen.WALLET>;
};

export const WalletScreen: React.FC<Props> = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(true);

  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s);
  const currentWallet = GetCurrentWallet(state);
  const currency = GetCurrencySelector(state);
  const assets = GetAssetsSelector(state, currentWallet);
  const fiatValue = GetTotalFiatValueSelector(state, currentWallet);
  const walletService = new WalletService();

  const openCoin = function (_: Asset) {
    // TODO: Enable open coin screen once ready.
    // navigation.navigate(Screen.COIN, {
    //   asset: asset,
    // });
  };

  const headerAction = function (action: WalletHeaderAction) {
    switch (action) {
      case WalletHeaderAction.RECEIVE:
        // @ts-ignore
        navigation.navigate(Screen.WALLET_STACK, {
          screen: Screen.SELECT_ASSET,
          params: {type: SelectAssetType.RECEIVE},
        });
        break;
      case WalletHeaderAction.BUY:
        // @ts-ignore
        navigation.navigate(Screen.WALLET_STACK, {
          screen: Screen.SELECT_ASSET,
          params: {type: SelectAssetType.BUY},
        });
        break;
    }
  };

  const pullRefreshBalance = React.useCallback(() => {
    refreshBalance(currentWallet);
  }, []);

  const refreshBalance = React.useCallback((wallet: Wallet) => {
    setRefreshing(true);

    walletService
      .refresh(dispatch, wallet, currency)
      .catch(error => {
        console.log('wallet service error: ', error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    console.log(`current wallet changed to: ${currentWallet.name} (${currentWallet.id})`);
    refreshBalance(currentWallet);
  }, [currentWallet]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={assets}
        renderItem={({item}) => <AssetListItem asset={item} onPress={() => openCoin(item.asset)} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={pullRefreshBalance} tintColor={Colors.GRAY} />
        }
        ListHeaderComponent={<WalletHeader fiatValue={fiatValue} onPress={headerAction} />}
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
