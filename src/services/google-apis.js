import axios from 'axios';
import reactotron from 'reactotron-react-native';

const getCitiesByName = async ({ name, setFindedCities, setShowCitiesModal }) => {
  const key = 'AIzaSyAsceWUlXxulQJohZddfRPstfcNl7FcE2s';
  const sessionToken = '12381247512';
  setShowCitiesModal(false);
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

  setFindedCities(normalizedPreditionsData);
  return setShowCitiesModal(true);
};

const getCitieById = async placeId => {
  const key = 'AIzaSyAsceWUlXxulQJohZddfRPstfcNl7FcE2s';

  const { data } = await axios({
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&placeid=${placeId}&language=pt-BR&fields=geometry`
  });

  reactotron.log(data);
};

export { getCitieById, getCitiesByName };
