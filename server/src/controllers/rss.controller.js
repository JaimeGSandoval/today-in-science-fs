const Parser = require('rss-parser');
const AppError = require('../utils/app-error');

const parser = new Parser();

const httpRssFeed = async (req, res, next) => {
  //   const { category } = req.params;
  //   const rssFeedUrl = `https://phys.org/rss-feed/space-news/${category}/`;
  const twitterRssUrl = process.env.TWITTER_RSS_URL;

  try {
    const feed = await parser.parseURL(twitterRssUrl);
    const articles = feed.items.slice(0, 10).map((item) => {
      return {
        title: item.title,
        link: item.link,
        date: item.pubDate,
      };
    });

    return res.status(200).json(articles);
  } catch (e) {
    return next(new AppError(e.message), 500);
  }
};

module.exports = {
  httpRssFeed,
};
