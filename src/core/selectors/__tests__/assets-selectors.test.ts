import {AssetInfo} from '@magicwallet/chain-types';
import {GetAssetTitle} from '../assets-selectors';

it('test GetAssetTitle', () => {
  expect(GetAssetTitle(new AssetInfo('Ethereum', 'ETH', 18))).toBe('Ethereum (ETH)');
});
