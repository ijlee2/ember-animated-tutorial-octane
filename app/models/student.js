import Model, { attr, hasMany } from '@ember-data/model';

export default class StudentModel extends Model {
    /*
        Personal information
    */
    @attr('string') firstName;
    @attr('string') lastName;
    @attr('string') email;
    @attr('string') phone;
    @attr('string') imageUrl;


    /*
        Model relationships
    */
    @hasMany('resume', { async: false }) resumes;


    /*
        Computed properties
    */
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get initials() {
        const firstNameInitial = (this.firstName || '').charAt(0).toUpperCase();
        const lastNameInitial = (this.lastName || '').charAt(0).toUpperCase();

        return `${firstNameInitial}${lastNameInitial}`;
    }

    get internationalPhone() {
        if (!this.phone) {
            return '';
        }

        const phone = this.phone.replace(/[()]/g, '').replace(/\s+/g, '-');

        return `+1-${phone}`;
    }
}