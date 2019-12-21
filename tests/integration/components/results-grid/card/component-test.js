import { findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | results-grid/card', function(hooks) {
    setupRenderingTest(hooks);

    test('should render', async function(assert) {
        this.student = {
            fullName: 'Jane Smith',
            metadata: {
                relativeScore: 98,

                experiences: [
                    {
                        title: 'Lead Frontend Developer',
                        company: 'Ember',
                        achievements: [
                            'Created Ember Octane',
                            'Promoted mentorship and fostering in community'
                        ]
                    }
                ],

                skills: [
                    {
                        name: 'Ember',
                        category: 'frontend',
                        synonyms: ['Ember.js']
                    },
                    {
                        name: 'Glimmer',
                        category: 'frontend',
                        synonyms: ['Glimmer.js']
                    },
                    {
                        name: 'Leadership',
                        category: 'miscellaneous'
                    },
                    {
                        name: 'Rails',
                        category: 'backend',
                        synonyms: ['Ruby on Rails']
                    }
                ]
            }
        };

        await render(hbs`
            <ResultsGrid::Card
                @student={{this.student}}
            />
        `);


        // Check basic information
        assert.dom('[data-test-field="Name"]')
            .hasText('Jane Smith', 'We see the correct name.');

        assert.dom('[data-test-field="Score"]')
            .hasText('98', 'We see the correct score.');


        // Check experiences
        const experiences = findAll('[data-test-field="Experience"]');

        assert.strictEqual(experiences.length, 1, 'We see 1 experience.');

        assert.dom('[data-test-title]', experiences[0])
            .hasText('Lead Frontend Developer at Ember', 'We see the correct title for the 1st experience.');

        const achievements = experiences[0].querySelectorAll('[data-test-achievement]');

        assert.strictEqual(achievements.length, 2, 'We see 2 achievements for the 1st experience.');

        assert.dom(achievements[0])
            .hasText('Created Ember Octane', 'We see the correct achievement for the 1st experience.');
        assert.dom(achievements[1])
            .hasText('Promoted mentorship and fostering in community', 'We see the correct achievement for the 2nd experience.');


        // Check skills
        assert.dom('[data-test-skills]')
            .hasText('Ember, Glimmer, Leadership, Rails', 'We see the correct skills.');
    });
});