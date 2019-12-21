import Component from '@glimmer/component';

export default class StudentDetailsComponent extends Component {
    // For simplicity, we assume that each student has only one resume
    get resume() {
        return this.args.student.resumes.objectAt(0);
    }
}