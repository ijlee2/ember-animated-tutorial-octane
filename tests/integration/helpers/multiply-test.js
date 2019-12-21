import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Helper | multiply', function(hooks) {
    setupRenderingTest(hooks);

    test('should multiply number', async function(assert) {
        await render(hbs`{{multiply}}`);

        assert.dom(this.element).hasText('');

        await render(hbs`{{multiply 100}}`);

        assert.dom(this.element).hasText('100');

        await render(hbs`{{multiply 100 0}}`);

        assert.dom(this.element).hasText('0');

        await render(hbs`{{multiply -100 1}}`);

        assert.dom(this.element).hasText('-100');

        await render(hbs`{{multiply 100 2}}`);

        assert.dom(this.element).hasText('200');

        await render(hbs`{{multiply 1000 1 2}}`);

        assert.dom(this.element).hasText('2000');

        await render(hbs`{{multiply 1000 2 30}}`);

        assert.dom(this.element).hasText('60000');
    });
});