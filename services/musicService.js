import axios from 'axios';

export const searchMusicAlbum = async (name) => {
  const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/search',
    params: { term: name, locale: 'en-US', offset: '0', limit: '20' },
    headers: {
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
      'X-RapidAPI-Key': '9927dbddbdmsh4dddb1c2e8145c2p178963jsnccf04ad145eb',
    },
  };

  const resp = await axios
    .request(options)
    .then(function (response) {
      return response;
    })

    .catch(function (error) {
      console.error(error);
    });

  return resp.data.tracks.hits;
};
