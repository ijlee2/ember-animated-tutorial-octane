import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Modifier | fade-up', function(hooks) {
    setupRenderingTest(hooks);

    // Replace this with your real tests.
    test('should render', async function(assert) {
        await render(hbs`
            <div {{fade-up}}></div>
        `);

        assert.ok(true);
    });
});