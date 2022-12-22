const axios = require('axios');
// const Parser = require('rss-parser');
const AppError = require('../utils/app-error');

// const parser = new Parser();

// const SUBJECTS = [
//   'artificial-intelligence',
//   'ancient-civilizations',
//   'astronomy',
//   'energy-technology',
//   'mathematics',
//   'neural-interfaces',
//   'neuroscience',
//   'new-species',
//   'quantum-computers',
// ];

// const RSS_URLS = [
//   'https://www.sciencedaily.com/rss/computers_math/artificial_intelligence.xml',
//   'https://www.sciencedaily.com/rss/fossils_ruins/ancient_civilizations.xml',
//   'https://www.sciencedaily.com/rss/space_time/astronomy.xml',
//   'https://www.sciencedaily.com/rss/matter_energy/energy_technology.xml',
//   'https://www.sciencedaily.com/rss/computers_math/mathematical_modeling.xml',
//   'https://www.sciencedaily.com/rss/computers_math/neural_interfaces.xml',
//   'https://www.sciencedaily.com/rss/mind_brain/neuroscience.xml',
//   'https://www.sciencedaily.com/rss/plants_animals/new_species.xml',
//   'https://www.sciencedaily.com/rss/computers_math/quantum_computers.xml',
// ];

const httpInitiate = async (req, res, next) => {
  // const fetchArticles = (urls) => {
  //   const promises = urls.map(async (url, i) => {
  //     return {
  //       articles: await parser.parseURL(url),
  //       subject: SUBJECTS[i],
  //     };
  //   });

  //   return Promise.all(promises);
  // };

  async function getAllArticles() {
    const options = {
      method: 'GET',
      params: { category: 'science', safeSearch: 'Strict', textFormat: 'Raw' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '806b3916cfmsh9852bc41b0897a1p11d875jsn677ad6dadabd',
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
      // homeArticles,
    },
  });

  // try {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://bing-news-search1.p.rapidapi.com/news',
  //     params: { category: 'science', safeSearch: 'Strict', textFormat: 'Raw' },
  //     headers: {
  //       'X-BingApis-SDK': 'true',
  //       'X-RapidAPI-Key': '806b3916cfmsh9852bc41b0897a1p11d875jsn677ad6dadabd',
  //       'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  //     },
  //   };

  // let allArticles;

  // axios
  //   .request(options)
  //   .then((response) => {
  //     console.log(response.data);
  //     allArticles = response.data;
  //     return res.status(200).json({
  //       status: 'Success',
  //       data: {
  //         allArticles,
  //         // homeArticles,
  //       },
  //     });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  //     const fetchedArticles = await fetchArticles(RSS_URLS);
  //     const articles = fetchedArticles.flat();

  //     console.log('FLAT ARTICLES', articles);

  //     const test = articles.map((el) => el.articles.items.slice(0, 10));
  //     test.forEach((el, i) => {
  //       el[i].forEach((a) => console.log('YOOOOOOO', a));
  //     });

  //     const allArticles = articles.map((el, i) => {
  //       return {
  //         articles: el.articles.items.slice(0, 10),
  //         subject: SUBJECTS[i],
  //       };
  //     });

  //     const homeArticles = articles.map((el, i) => {
  //       return {
  //         article: el.articles.items[0],
  //         subject: SUBJECTS[i],
  //       };
  //     });

  //     return res.status(200).json({
  //       status: 'Success',
  //       data: {
  //         allArticles,
  //         // homeArticles,
  //       },
  //     });
  //   } catch (e) {
  //     return next(new AppError(e.message), 500);
  //   }
};

module.exports = {
  httpInitiate,
};
