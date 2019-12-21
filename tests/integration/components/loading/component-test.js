import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | loading', function(hooks) {
    setupRenderingTest(hooks);

    test('should display a text for feedback', async function(assert) {
        await render(hbs`
            <Loading />
        `);

        assert.dom('[data-test-feedback]', this.element)
            .hasText('Loading', 'We see the feedback message.');
    });
});