import axios from 'axios';

const getCitiesByName = async ({ name, type }) => {
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
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${name
        .normalize('NFD')
        .replace(
          /[\u0300-\u036f]/g,
          ''
        )}&key=${key}&language=pt-BR&types=${type}&sessionToken=${sessionToken}`
    });

    const normalizedPreditionsData = predictions.map(predict => {
      const { description, place_id: placeId, terms } = predict;

      return {
        label: type === 'establishment' ? `${terms[0]?.value}, ${terms[4]?.value}` : description,
        id: placeId
      };
    });

    return normalizedPreditionsData;
  } catch (error) {
    return {};
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
