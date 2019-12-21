import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
    location = config.locationType;
    rootURL = config.rootURL;
}

Router.map(function() {
    this.route('search');
    this.route('search-results', { path: '/search/results' });

    this.route('students', function() {
        this.route('student', { path: '/:id' });
    });
});