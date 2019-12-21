import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
    @service router;

    get currentRoute() {
        const currentRouteName = (this.router.currentRouteName || '')
            .replace(/\.index/g, '')
            .replace(/_loading/g, '')
            .replace(/\./g, '__');

        return `my-route__${currentRouteName}`;
    }
}