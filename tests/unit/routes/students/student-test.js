import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Route | students/student', function(hooks) {
    setupTest(hooks);

    test('it exists', function(assert) {
        let route = this.owner.lookup('route:students/student');
        assert.ok(route);
    });
});