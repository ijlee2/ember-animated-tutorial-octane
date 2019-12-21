import { set } from '@ember/object';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | skill-pill', function(hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function() {
        this.skill = {
            id: '1',
            name: 'JavaScript',
            category: 'frontend',
            isSelected: false
        };
    });

    test('should render', async function(assert) {
        await render(hbs`
            <SkillPill
                @skill={{this.skill}}
            />
        `);

        assert.dom('[data-test-icon]')
            .hasText('add_circle', 'We see the correct icon.');
        assert.dom('[data-test-field="Skill"]')
            .hasText('JavaScript', 'We see the correct name.');
    });

    test('should call onClickHandler when clicked', async function(assert) {
        assert.expect(3);

        this.onClickHandler = () => {
            set(this.skill, 'isSelected', true);

            assert.ok(true, 'We can click on the pill.');
        };

        await render(hbs`
            <SkillPill
                @skill={{this.skill}}
                @onClickHandler={{this.onClickHandler}}
            />
        `);

        await click('[data-test-pill]');

        assert.dom('[data-test-icon]')
            .hasText('remove_circle', 'We see the correct icon.');
        assert.dom('[data-test-field="Skill"]')
            .hasText('JavaScript', 'We see the correct name.');
    });
});