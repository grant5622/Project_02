
async function test(){
    require('dotenv').config();
    const axios = require('axios');
    const API_KEY=process.env.API_KEY;
    const options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/v2/get/basic',
      params: {
        country: 'us',
        imdb_id: 'tt1877830',
        output_language: 'en'
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
        console.log(response.data.result.streamingInfo.us);
    } catch (error) {
        console.error(error);
    }
}
test();