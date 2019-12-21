import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | profile-image', function(hooks) {
    setupRenderingTest(hooks);

    test('should render an icon if imageUrl doesn\'t exist', async function(assert) {
        await render(hbs`
            <ProfileImage />
        `);

        assert.dom('[data-test-icon]').exists('We see the profile icon.');
    });

    test('should render an icon if imageUrl is not valid', async function(assert) {
        await render(hbs`
            <ProfileImage
                @imageUrl="my_profile_pic.png"
            />
        `);
        await settled();

        assert.dom('[data-test-image]').doesNotExist('We do not see the profile image.');
        assert.dom('[data-test-icon]').exists('We see the profile icon.');
    });
});