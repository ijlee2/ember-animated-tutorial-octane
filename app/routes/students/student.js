import Route from '@ember/routing/route';

export default class StudentsStudentRoute extends Route {
    model(params) {
        return this.store.loadRecord('student', params.id, {
            include: 'resumes,resumes.degrees,resumes.experiences,resumes.skills'
        });
    }
}