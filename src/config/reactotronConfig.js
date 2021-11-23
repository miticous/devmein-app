import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron.configure({
  host: NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0]
})
  .useReactNative()
  .connect();

// eslint-disable-next-line no-console
console.tron = reactotron;

export default reactotron;
