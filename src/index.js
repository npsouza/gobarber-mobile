import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {StatusBar} from 'react-native';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import './config/ReactotronConfig';

import {store, persistor} from './store';
import App from './App';

class Index extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('9ae0fb79-97d5-4f3a-b1c1-07e79463d991');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  onReceived = data => {};

  onOpened = notification => {};

  onIds = id => {};

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);
