import * as React from 'react';
import {RootStackParamList} from '@magicwallet/navigation';
import {Provider} from 'react-redux';
import {store, persistor} from './core/store';
import {Main} from './features/main/screens/Main';
import {PersistGate} from 'redux-persist/integration/react';

const App: React.FC<RootStackParamList> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
