import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { parallel } from 'ember-animated';
import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';

export default class NavigationDrawerComponent extends Component {
    @service router;

    *transition({ receivedSprites }) {
        receivedSprites.forEach(sprite => {
            parallel(
                move(sprite),
                scale(sprite)
            );
        });
    }

    get currentParentRoute() {
        const currentParentRoute = (this.router.currentURL || '').split('/')[1];

        return currentParentRoute || 'index';
    }
}