import { findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | navigation-drawer', function(hooks) {
    setupRenderingTest(hooks);

    test('should display links', async function(assert) {
        await render(hbs`
            <NavigationDrawer
                @name="Main Navigation"
                @navItems={{array
                    (hash route="index" label="Home")
                    (hash route="students" label="Students")
                    (hash route="search" label="Search")
                }}
            />
        `);

        assert.dom('[data-test-nav]')
            .hasAttribute('aria-label', 'Main Navigation', 'We see the correct ARIA label.');

        const links = findAll('[data-test-link]');

        assert.strictEqual(links.length, 3, 'We see 3 links.');

        assert.dom('[data-test-label]', links[0])
            .hasText('Home', 'We see the correct 1st link.');
        assert.dom('[data-test-label]', links[1])
            .hasText('Students', 'We see the correct 2nd link.');
        assert.dom('[data-test-label]', links[2])
            .hasText('Search', 'We see the correct 3rd link.');
    });
});