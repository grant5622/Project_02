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
    const movieInfo = JSON.parse(result);
    displayMovieInfo(movieInfo);
  } catch (error) {
    console.error(error);
    displayError('Failed to fetch movie information. Please try again.');
  }
}

function displayMovieInfo(movieInfo) {
  const movieInfoContainer = document.getElementById('movieInfo');
  movieInfoContainer.innerHTML = '';

  if (movieInfo && movieInfo.title && movieInfo.options) {
    const title = document.createElement('h2');
    title.textContent = movieInfo.title;
    movieInfoContainer.appendChild(title);

    const country = document.createElement('p');
    country.textContent = `Country: ${movieInfo.country || 'N/A'}`;
    movieInfoContainer.appendChild(country);

    const options = movieInfo.options;
    for (const [type, providers] of Object.entries(options)) {
      const optionHeading = document.createElement('h3');
      optionHeading.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Options`;
      movieInfoContainer.appendChild(optionHeading);

      const providerList = document.createElement('ul');
      providers.forEach((provider) => {
        const providerItem = document.createElement('li');
        const providerLink = document.createElement('a');
        providerLink.href = provider.providerUrl;
        providerLink.textContent = `${provider.provider} - ${provider.option} (${provider.pricing})`;
        providerItem.appendChild(providerLink);
        providerList.appendChild(providerItem);
      });

      movieInfoContainer.appendChild(providerList);
    }
  } else {
    displayError('No movie information available for the given title.');
  }
}

function displayError(message) {
  const movieInfoContainer = document.getElementById('movieInfo');
  movieInfoContainer.innerHTML = '';

  const errorParagraph = document.createElement('p');
  errorParagraph.textContent = message;
  movieInfoContainer.appendChild(errorParagraph);
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
});
