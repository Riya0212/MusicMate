import 'react-native-gesture-handler';
import {Component} from 'react';
import Router from '@/navigation/appNavigation';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import { persister, reduxStore } from '@/redux/store/reduxStore';
import { PersistGate } from 'redux-persist/integration/react';

export default class App extends Component {
  render() {
    return (
      <StoreProvider store={reduxStore}>
        <PersistGate persistor={persister} loading={null}>
          <Router/>
        </PersistGate>
      </StoreProvider>
    );
  }
}
