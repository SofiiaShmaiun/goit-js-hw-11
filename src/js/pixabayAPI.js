import axios from "axios";

const API_KEY = '34892957-edf6b51172121986d596d6631';
const BASE_URL = 'https://pixabay.com/api/';

const queryInput = document.querySelector('input');

let page = 1;
const per_page = 40;
let queryText;

queryInput.addEventListener('input', event => {
  queryText = event.currentTarget.value.trim();
});

async function pixabayAPI() {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q='${queryText}'&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  return response;
}

export { pixabayAPI, queryInput };
