import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  Reactotron.configure().useReactNative().connect().clear!();

  // console.tron = tron;
}
