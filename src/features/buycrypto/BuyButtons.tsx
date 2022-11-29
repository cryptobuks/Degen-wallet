import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MagicButton} from '@magicwallet/core-components';
import {MagicButtonStyle} from '@magicwallet/styles';

class BuyButtonsProps {
  amounts: number[][];
  onPress: (amount: number) => void;
}

export class BuyButtons extends React.Component<BuyButtonsProps> {
  render() {
    return (
      <View>
        {this.props.amounts.map(amounts => (
          <View style={styles.input_buttons} key={String(amounts)}>
            {amounts.map(amount => (
              <View style={styles.input_button} key={String(amount)}>
                <MagicButton
                  title={`$${String(amount)}`}
                  style={MagicButtonStyle.light}
                  onPress={_ => {
                    this.props.onPress(amount);
                  }}
                />
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input_buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  input_button: {
    flex: 1,
    padding: 4,
    margin: 4,
    width: 90,
  },
});
