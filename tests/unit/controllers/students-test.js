import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Controller | students', function(hooks) {
    setupTest(hooks);

    // Replace this with your real tests.
    test('it exists', function(assert) {
        let controller = this.owner.lookup('controller:students');
        assert.ok(controller);
    });
});