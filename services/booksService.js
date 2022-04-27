import axios from 'axios';

const apiUrl = 'https://www.googleapis.com/books/';
const apiKey = 'AIzaSyDdsCh-75Myx04J6kSeXuoSVkat1vDqaJQ';

export const searchBook = async (title) => {
  const resp = await axios.get(`${apiUrl}v1/volumes?q=${title}&key=${apiKey}`);
  return resp.data.items;
};
