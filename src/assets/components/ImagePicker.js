import * as RNImagePicker from 'react-native-image-picker';
import { Platform } from 'react-native';

//   const openPicker = () =>
//     ImagePicker.showImagePicker(options, response => {
//       const path = response.uri;
//       if (response.didCancel) {
//         return true;
//       }
//       if (response.error) {
//         return true;
//       }
//       return setState({
//         ...state,
//         file: response.data,
//         avatar: path.replace('file//', '')
//       });
//     });

const ImagePicker = {
  show: (options, { onError, onSuccess }) =>
    RNImagePicker.launchImageLibrary(options, response => {
      if (response.error) {
        return onError();
      }
      if (response.didCancel) {
        return false;
      }

      const path =
        Platform.OS === 'ios'
          ? response.assets[0].uri.replace('file://', '')
          : response.uri;

      return onSuccess({ path, file: response.assets[0].base64 });
    }),
};

export default ImagePicker;
