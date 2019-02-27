import registerGsubSimulateRoute from './server/routes/api/register_gsub_simulate_route';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'elastic_gsub_plugin',
    uiExports: {
      app: {
        title: 'Elastic Gsub Plugin',
        description: 'elastic gsub plugin',
        main: 'plugins/elastic_gsub_plugin/app',
      },
      hacks: [
        'plugins/elastic_gsub_plugin/hack'
      ],
      styleSheetPaths: require('path').resolve(__dirname, 'public/app.scss'),
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server) { // eslint-disable-line no-unused-vars
      // Add server routes and initialize the plugin here
      registerGsubSimulateRoute(server);
    }
  });
}
