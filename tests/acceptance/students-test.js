import { click, currentURL, find, settled, visit } from '@ember/test-helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

import createDegrees from 'ember-animated-tutorial-octane/mirage/scenarios/degree';
import createExperiences from 'ember-animated-tutorial-octane/mirage/scenarios/experience';
import createSkills from 'ember-animated-tutorial-octane/mirage/scenarios/skill';

module('Acceptance | students', function(hooks) {
    setupApplicationTest(hooks);
    setupMirage(hooks);

    hooks.beforeEach(function() {
        createDegrees(this.server);
        createExperiences(this.server);
        createSkills(this.server);

        // Create students
        this.server.createList('student', 5);

        this.student = this.server.db.students[0];
        this.resume = this.server.db.resumes.find(this.student.resumeIds[0]);
    });


    test('We can find a student', async function(assert) {
        await visit('/students');

        assert.strictEqual(
            currentURL(),
            '/students',
            'We can visit Students page.'
        );

        assert.dom('[data-test-card]')
            .exists({ count: 5 }, 'We see 5 students.');

        // Select the first student
        const student = this.student;
        const resume = this.resume;
        const fullName = `${student.firstName} ${student.lastName}`;

        // Because faker.js creates URLs to actual images, we use settled()
        // to wait for the profile image to be displayed.
        await click(`[data-test-card="${fullName}"]`);
        await settled();

        assert.strictEqual(
            currentURL(),
            '/students/1',
            'We can visit the 1st student page.'
        );

        // Check the details
        const detailsPage = find('[data-test-details]');

        assert.dom('[data-test-field="Name"]', detailsPage)
            .hasText(fullName, 'We see the correct name.');

        if (student.imageUrl === '') {
            assert.dom('[data-test-icon]', detailsPage)
                .exists('We see the correct profile icon.');

        } else {
            assert.dom('[data-test-image]', detailsPage)
                .exists('We see the correct profile image.');

        }

        assert.dom('[data-test-field="Email"]', detailsPage)
            .hasText(student.email, 'We see the correct email.');

        assert.dom('[data-test-field="Phone"]', detailsPage)
            .hasText(student.phone, 'We see the correct phone number.');

        assert.dom('[data-test-field="Degree"]', detailsPage)
            .exists({ count: resume.degreeIds.length }, 'We see the correct number of degrees.');

        assert.dom('[data-test-field="Experience"]', detailsPage)
            .exists({ count: resume.experienceIds.length }, 'We see the correct number of experiences.');

        assert.dom('[data-test-field="Skill"]', detailsPage)
            .exists({ count: resume.skillIds.length }, 'We see the correct number of skills.');
    });


    test('We can find another student', async function(assert) {
        await visit('/students');

        // Select the first student
        let student = this.student;
        let fullName = `${student.firstName} ${student.lastName}`;

        await click(`[data-test-card="${fullName}"]`);
        await settled();

        assert.strictEqual(
            currentURL(),
            '/students/1',
            'We can visit the 1st student page.'
        );

        assert.dom('[data-test-field="Name"]', find('[data-test-details]'))
            .hasText(fullName, 'We see the correct name.');

        // Select the second student
        student = this.server.db.students[1];
        fullName = `${student.firstName} ${student.lastName}`;

        await click(this.element.querySelector(`[data-test-card="${fullName}"]`));
        await settled();

        assert.strictEqual(
            currentURL(),
            '/students/2',
            'We can visit the 2nd student page.'
        );

        assert.dom('[data-test-field="Name"]', find('[data-test-details]'))
            .hasText(fullName, 'We see the correct name.');
    });


    test('We can return to Students page', async function(assert) {
        await visit('/students');

        assert.strictEqual(
            currentURL(),
            '/students',
            'We can visit Students page.'
        );

        assert.dom('[data-test-card]')
            .exists({ count: 5 }, 'We see 5 students.');

        await click('[data-test-link="Home"]');

        assert.strictEqual(
            currentURL(),
            '/',
            'We can visit Home page.'
        );

        assert.dom('[data-test-card]')
            .doesNotExist('We see 0 students.');

        await visit('/students');

        assert.strictEqual(
            currentURL(),
            '/students',
            'We can visit Students page.'
        );

        assert.dom('[data-test-card]')
            .exists({ count: 5 }, 'We see 5 students.');
    });
});