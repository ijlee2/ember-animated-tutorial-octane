import Model, { attr } from '@ember-data/model';

export default class DegreeModel extends Model {
    @attr('string') name;
}