import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
    /*************************************************************************************

        Personal information

    *************************************************************************************/
    firstName() {
        return faker.name.firstName();
    },

    lastName() {
        return faker.name.lastName();
    },

    email() {
        // Derive the username from the member's first and last names
        return faker.internet.email(this.firstName, this.lastName);
    },

    phone() {
        // Create a phone number (xxx) xxx-xxxx
        return faker.phone.phoneNumberFormat(1);
    },

    imageUrl() {
        // Create an image 80% of the time
        return Math.random() >= 0.2 ? faker.image.avatar() : '';
    },


    /*************************************************************************************

        Model relationships

    *************************************************************************************/
    afterCreate(student, server) {
        server.create('resume', { student });
    },
});