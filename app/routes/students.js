import Route from '@ember/routing/route';

export default class StudentsRoute extends Route {
    model() {
        return this.store.loadRecords('student');
    }
}