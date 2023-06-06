const apiKey = 'e4d3be3050msh3be4a823139c18bp1a04d3jsn3a44e328a3f3';
const host = 'where-can-i-watch1.p.rapidapi.com';

async function searchMovies(title, region) {
  const url = `https://${host}/${region}/movie/${encodeURIComponent(title)}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': host,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

const movieForm = document.getElementById('movieForm');
movieForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const titleInput = document.getElementById('title');
  const title = titleInput.value.trim();

  const regionSelect = document.getElementById('region');
  const region = regionSelect.value;

  if (title !== '') {
    searchMovies(title, region);
  }
})