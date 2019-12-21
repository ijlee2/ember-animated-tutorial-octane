import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | material-icon', function(hooks) {
    setupRenderingTest(hooks);

    test('should render', async function(assert) {
        await render(hbs`
            <MaterialIcon
                @icon="add"
            />
        `);

        assert.dom('[data-test-icon]').hasText('add', 'We see the correct icon.');

        await render(hbs`
            <MaterialIcon
                @icon="delete"
            />
        `);

        assert.dom('[data-test-icon]').hasText('delete', 'We see the correct icon.');
    });
});