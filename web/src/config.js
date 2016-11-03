const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  serverApi: 'https://api.3acg.com',
  //serverApi: 'http://localhost:8000',
  app: {
    title: '恋绘·星祈',
    description: '恋绘·星祈',
    head: {
      titleTemplate: '%s - 恋绘·星祈',
      meta: [
        {name: 'description', content: '恋绘·星祈'},
        {charset: 'utf-8'},
        // {property: 'og:site_name', content: 'React Redux Example'},
        // {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        // {property: 'og:locale', content: 'en_US'},
        // {property: 'og:title', content: 'React Redux Example'},
        // {property: 'og:description', content: 'All the modern best practices in one example.'},
        // {property: 'og:card', content: 'summary'},
        // {property: 'og:site', content: '@erikras'},
        // {property: 'og:creator', content: '@erikras'},
        // {property: 'og:title', content: 'React Redux Example'},
        // {property: 'og:description', content: 'All the modern best practices in one example.'},
        // {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        // {property: 'og:image:width', content: '200'},
        // {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
