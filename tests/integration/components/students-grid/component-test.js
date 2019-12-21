import { findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | students-grid', function(hooks) {
    setupRenderingTest(hooks);

    test('should display students, sorted by last name, then first', async function(assert) {
        this.students = [
            {
                firstName: 'John',
                lastName: 'Smith',
                fullName: 'John Smith'
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                fullName: 'Jane Smith'
            },
            {
                firstName: 'Ben',
                lastName: 'Howard',
                fullName: 'Ben Howard'
            }
        ];

        await render(hbs`
            <StudentsGrid
                @students={{this.students}}
            />
        `);

        const students = findAll('[data-test-card]');

        assert.dom('[data-test-field="Name"]', students[0])
            .hasText('Ben Howard', 'We see the correct 1st student.');
        assert.dom('[data-test-field="Name"]', students[1])
            .hasText('Jane Smith', 'We see the correct 2nd student.');
        assert.dom('[data-test-field="Name"]', students[2])
            .hasText('John Smith', 'We see the correct 3rd student.');
    });
});