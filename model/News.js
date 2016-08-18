class News {}
News.schema = {
  name: "News",
  properties: {
    title:  'string',
    desc:  'string',
    category: 'string',
    date: 'date', // optional property

  }
};
module.exports = News;
