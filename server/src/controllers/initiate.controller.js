const axios = require('axios');
const AppError = require('../utils/app-error');

const httpInitiate = async (req, res, next) => {
  async function getAllArticles() {
    const options = {
      method: 'GET',
      params: { category: 'science', safeSearch: 'Strict', textFormat: 'Raw' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': process.env.BING_SEARCH_API_KEY,
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.get('https://bing-news-search1.p.rapidapi.com/news', options);

      return response.data;
    } catch (e) {
      console.error(e);
      return next(new AppError(e.message), 500);
    }
  }

  const fetchedArticles = await getAllArticles();

  return res.status(200).json({
    status: 'Success',
    data: {
      fetchedArticles,
    },
  });
};

module.exports = {
  httpInitiate,
};
