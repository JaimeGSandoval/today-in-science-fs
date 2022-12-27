// const Parser = require('rss-parser');
// const AppError = require('../utils/app-error');

// const parser = new Parser();

// const httpRssFeed = async (req, res, next) => {
//   //   const { category } = req.params;
//   // const rssFeedUrl = `https://phys.org/rss-feed/space-news/${category}/`;
//   // const rssFeedUrl = 'https://phys.org/rss-feed/breaking/physics-news/quantum-physics/';
//   const rssFeedUrl = 'https://www.sciencedaily.com/rss/computers_math/quantum_computers.xml';

//   try {
//     const feed = await parser.parseURL(rssFeedUrl);
//     const articles = feed.items.slice(0, 10).map((item) => {
//       return {
//         title: item.title,
//         description: item.content,
//         date: item.pubDate,
//         link: item.link,
//       };
//     });

//     return res.status(200).json(articles);
//   } catch (e) {
//     return next(new AppError(e.message), 500);
//   }
// };

// module.exports = {
//   httpRssFeed,
// };
