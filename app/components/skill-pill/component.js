import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export default class SkillPillComponent extends Component {
    inputId = `input-${guidFor(this)}`;
}