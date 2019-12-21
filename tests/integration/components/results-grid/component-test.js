import { findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | results-grid', function(hooks) {
    setupRenderingTest(hooks);

    test('should display students, sorted by score, last name, then first', async function(assert) {
        this.students = [
            {
                id: '1',
                firstName: 'John',
                lastName: 'Smith',
                fullName: 'John Smith',

                metadata: {
                    score: 91
                }
            },
            {
                id: '2',
                firstName: 'Jane',
                lastName: 'Smith',
                fullName: 'Jane Smith',

                metadata: {
                    score: 98
                }
            },
            {
                id: '3',
                firstName: 'Ben',
                lastName: 'Howard',
                fullName: 'Ben Howard',

                metadata: {
                    score: 91
                }
            }
        ];

        await render(hbs`
            <ResultsGrid
                @students={{this.students}}
            />
        `);

        const students = findAll('[data-test-card]');

        assert.dom('[data-test-field="Name"]', students[0])
            .hasText('Jane Smith', 'We see the correct 1st student.');
        assert.dom('[data-test-field="Name"]', students[1])
            .hasText('Ben Howard', 'We see the correct 2nd student.');
        assert.dom('[data-test-field="Name"]', students[2])
            .hasText('John Smith', 'We see the correct 3rd student.');
    });
});