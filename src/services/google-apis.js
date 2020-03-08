import axios from 'axios';

const getCitiesByName = ({ name, outputs }) => {
  const { data } = axios({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?&input='
  });
};
