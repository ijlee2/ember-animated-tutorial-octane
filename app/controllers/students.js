import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class StudentsController extends Controller {
    @service router;

    get showHeader() {
        return this.router.currentRouteName === 'students.index';
    }
}