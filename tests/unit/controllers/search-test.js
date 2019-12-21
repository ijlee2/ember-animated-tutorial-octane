import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Controller | search', function(hooks) {
    setupTest(hooks);

    // Replace this with your real tests.
    test('it exists', function(assert) {
        let controller = this.owner.lookup('controller:search');
        assert.ok(controller);
    });
});