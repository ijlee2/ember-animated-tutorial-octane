import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | students-grid/card', function(hooks) {
    setupRenderingTest(hooks);

    test('should render', async function(assert) {
        this.student = {
            fullName: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '(123) 456-7890',
            internationalPhone: '+1-123-456-7890'
        };

        await render(hbs`
            <StudentsGrid::Card
                @student={{this.student}}
            />
        `);

        assert.dom('[data-test-field="Name"]')
            .hasText('Jane Smith', 'We see the correct name.');
        assert.dom('[data-test-field="Email"]')
            .hasText('jane.smith@example.com', 'We see the correct email.');
        assert.dom('[data-test-field="Phone"]')
            .hasText('(123) 456-7890', 'We see the correct phone number.');
    });
});