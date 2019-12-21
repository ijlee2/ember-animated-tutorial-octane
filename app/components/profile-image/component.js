import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ProfileImageComponent extends Component {
    @tracked failedToLoadImage = false;

    @action loadDefaultImage() {
        this.failedToLoadImage = true;
    }
}