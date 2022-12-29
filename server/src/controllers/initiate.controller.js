const axios = require('axios');
const articlesModel = require('../models/articles.model');
const AppError = require('../utils/app-error');

const httpInitiate = async (req, res, next) => {
  const { user_id } = req.body;

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
      const newsResponse = await axios.get(
        'https://bing-news-search1.p.rapidapi.com/news',
        options
      );

      return newsResponse.data;
    } catch (e) {
      console.error(e);
      return next(new AppError(e.message), 500);
    }
  }

  const fetchedArticles = await getAllArticles();
  const favArticles = await articlesModel.getFavoriteArticles(user_id);
  const readArticles = await articlesModel.getReadLaterArticles(user_id);

  const favHash = {};
  const readHash = {};

  favArticles.rows.forEach((a) => {
    favHash[a.article_title] = a.article_title;
  });

  readArticles.rows.forEach((a) => {
    readHash[a.article_title] = a.article_title;
  });

  const finalArticles = fetchedArticles.value.map((a) => {
    const temp = { ...a };
    temp.isFavorite = false;
    temp.isReadLater = false;

    if (a.name === favHash[a.name]) {
      temp.isFavorite = true;
    }

    if (a.name === readHash[a.name]) {
      temp.isReadLater = true;
    }

    return temp;
  });

  return res.status(200).json({
    status: 'Success',
    data: {
      finalArticles,
    },
  });
};

module.exports = {
  httpInitiate,
};
