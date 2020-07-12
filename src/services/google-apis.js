import axios from 'axios';
import reactotron from 'reactotron-react-native';

const getCitiesByName = async ({ name }) => {
  const key = 'AIzaSyAsceWUlXxulQJohZddfRPstfcNl7FcE2s';
  const sessionToken = '12381247512';
  await new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, 1000)
  );
  try {
    const {
      data: { predictions }
    } = await axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${name}&key=${key}&language=pt-BR&types=%28cities%29&sessionToken=${sessionToken}`
    });

    const normalizedPreditionsData = predictions.map(predict => {
      const { description, place_id: placeId } = predict;

      return {
        label: description,
        id: placeId
      };
    });

    return normalizedPreditionsData;
  } catch (error) {
    reactotron.log(error);
  }
};

const getCitieById = async ({ placeId, state, setState, setLoading, label }) => {
  const key = 'AIzaSyAsceWUlXxulQJohZddfRPstfcNl7FcE2s';
  setLoading(true);

  const {
    data: {
      result: {
        geometry: {
          location: { lat, lng }
        },
        utc_offset: UTCOffset
      }
    }
  } = await axios({
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&placeid=${placeId}&language=pt-BR&fields=geometry,utc_offset`
  });
  const UTCFromMinutesToHours = UTCOffset / 60;
  setLoading(false);
  return setState({
    ...state,
    birthplace: {
      ...state.birthplace,
      placeId,
      lat: lat.toString(),
      lng: lng.toString(),
      description: label,
      UTC: UTCFromMinutesToHours.toString()
    }
  });
};

export { getCitieById, getCitiesByName };
