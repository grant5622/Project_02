const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://where-can-i-watch1.p.rapidapi.com/search/uk/back%20to%20the%20future',
  headers: {
    'X-RapidAPI-Key': 'e4d3be3050msh3be4a823139c18bp1a04d3jsn3a44e328a3f3',
    'X-RapidAPI-Host': 'where-can-i-watch1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

