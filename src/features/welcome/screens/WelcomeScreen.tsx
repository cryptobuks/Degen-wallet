import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Props, Screen} from '@magicwallet/navigation';
import {Colors, FontWeight, MagicButtonStyle} from '@magicwallet/styles';
import {MagicButton} from '@magicwallet/core-components/src/MagicButton';

export const WelcomeScreen: React.FC<Props<Screen.WELCOME>> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={require('../../../assets/images/logo.png')}
        />
        <Text style={styles.headerTitle}>Magic Wallet</Text>
        <Text style={styles.headerDescription}>
          Experience the magic of DeFi & NTFs
        </Text>
      </View>
      <View style={styles.footer}>
        <MagicButton
          style={MagicButtonStyle.normal}
          title={'Create a new wallet'}
          onPress={() => navigation.navigate(Screen.IMPORT_WALLET)}
        />
        <View style={{margin: 10}} />
        <MagicButton
          style={MagicButtonStyle.light}
          title={'I already have a wallet'}
          onPress={() => navigation.navigate(Screen.IMPORT_WALLET)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: FontWeight.SEMI_BOLD,
    color: Colors.WHITE,
    marginTop: 20,
  },
  headerImage: {
    marginTop: 24,
    height: 86,
    width: 86,
    borderRadius: 43,
  },
  headerDescription: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.GRAY,
    marginTop: 20,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  footerButton: {
    margin: 12,
  },
});
