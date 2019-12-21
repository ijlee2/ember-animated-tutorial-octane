import { click, currentURL, find, fillIn, triggerEvent, visit } from '@ember/test-helpers';
import { setupAnimationTest, time } from 'ember-animated/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | search', function(hooks) {
    setupApplicationTest(hooks);
    setupAnimationTest(hooks);
    setupMirage(hooks);

    hooks.beforeEach(function() {
        // Create skills
        this.server.create('skill', {
            id: '1',
            name: 'D3',
            category: 'frontend',
            synonyms: ['D3.js', 'JavaScript']
        });

        this.server.create('skill', {
            id: '2',
            name: 'Ember',
            category: 'frontend',
            synonyms: ['Ember.js', 'Ember Octane', 'JavaScript']
        });

        this.server.create('skill', {
            id: '3',
            name: 'Management',
            category: 'miscellaneous'
        });

        this.server.create('skill', {
            id: '4',
            name: 'Nearley',
            category: 'miscellaneous',
            synonyms: ['Nearley.js']
        });

        this.server.create('skill', {
            id: '5',
            name: 'QUnit',
            category: 'miscellaneous'
        });

        this.server.create('skill', {
            id: '6',
            name: 'Rails',
            category: 'backend',
            synonyms: ['Ruby on Rails']
        });
    });


    test('We can filter and select skills', async function(assert) {
        await visit('/search');

        assert.strictEqual(
            currentURL(),
            '/search',
            'We can visit Search page.'
        );

        const availableSkills = find('[data-test-available-skills]');
        const selectedSkills = find('[data-test-selected-skills]');

        assert.dom('[data-test-pill]', availableSkills)
            .exists({ count: 6 }, 'We see 6 available skills.');
        assert.dom('[data-test-pill]', selectedSkills)
            .exists({ count: 0 }, 'We see 0 selected skills.');

        // Search for Ember and Management
        await fillIn('[data-test-search', 'em');
        await triggerEvent('[data-test-search]', 'keyup', { keyCode: 73 });

        assert.dom('[data-test-pill]', availableSkills)
            .exists({ count: 2 }, 'We see 2 available skills.');
        assert.dom('[data-test-pill]', selectedSkills)
            .exists({ count: 0 }, 'We see 0 selected skills.');

        await click(availableSkills.querySelector('[data-test-pill="Ember"]'));
        await click(availableSkills.querySelector('[data-test-pill="Management"]'));

        assert.dom('[data-test-pill]', availableSkills)
            .exists({ count: 0 }, 'We see 0 available skills.');
        assert.dom('[data-test-pill]', selectedSkills)
            .exists({ count: 2 }, 'We see 2 selected skills.');

        await fillIn('[data-test-search]', '');
        await triggerEvent('[data-test-search]', 'keyup', { keyCode: 8 });

        assert.dom('[data-test-pill]', availableSkills)
            .exists({ count: 4 }, 'We see 4 available skills.');
        assert.dom('[data-test-pill]', selectedSkills)
            .exists({ count: 2 }, 'We see 2 selected skills.');

        // Search for QUnit
        await fillIn('[data-test-search]', 'qunit');
        await triggerEvent('[data-test-search]', 'keyup', { keyCode: 84 });

        assert.dom('[data-test-pill]', availableSkills)
            .exists({ count: 1 }, 'We see 1 available skill.');
        assert.dom('[data-test-pill]', selectedSkills)
            .exists({ count: 2 }, 'We see 2 selected skills.');

        await click(availableSkills.querySelector('[data-test-pill="QUnit"]'));

        assert.dom('[data-test-pill]', availableSkills)
            .exists({ count: 0 }, 'We see 0 available skills.');
        assert.dom('[data-test-pill]', selectedSkills)
            .exists({ count: 3 }, 'We see 3 selected skills.');

        // Remove Management
        await time.pause();
        await click(selectedSkills.querySelector('[data-test-pill="Management"]'));
        await time.advance(2000);

        assert.dom('[data-test-pill]', availableSkills)
            .exists({ count: 0 }, 'We see 0 available skills.');
        assert.dom('[data-test-pill]', selectedSkills)
            .exists({ count: 2 }, 'We see 2 selected skills.');
    });


    test('We can search for students who meet the skills', async function(assert) {
        // Create students
        this.server.create('student', {
            firstName: 'Jane',
            lastName: 'Smith',
        });

        this.server.create('student', {
            firstName: 'Rodrigo',
            lastName: 'Peña',
        });

        this.server.create('student', {
            firstName: 'Yannis',
            lastName: 'Philippakis',
        });

        assert.strictEqual(
            this.server.db.resumes.length,
            3,
            'We have 3 resumes.'
        );

        await visit('/search');

        const availableSkills = find('[data-test-available-skills]');
        const selectedSkills = find('[data-test-selected-skills]');

        await click(availableSkills.querySelector('[data-test-pill="Ember"]'));
        await click(availableSkills.querySelector('[data-test-pill="QUnit"]'));
        await click(availableSkills.querySelector('[data-test-pill="Rails"]'));

        assert.dom('[data-test-pill]', availableSkills)
            .exists({ count: 3 }, 'We see 3 available skills.');
        assert.dom('[data-test-pill]', selectedSkills)
            .exists({ count: 3 }, 'We see 3 selected skills.');

        await click('[data-test-button="Submit"]');

        // TODO: Because Mirage creates resumes, degrees, experiences, and skills randomly,
        // it's not easy to test how many students we will see and in what order.
        assert.strictEqual(
            currentURL(),
            '/search/results?sid=2%2C5%2C6',
            'We are redirected to Results page.'
        );
    });
});