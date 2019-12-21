import Model, { attr } from '@ember-data/model';

export default class ExperienceModel extends Model {
    @attr('string') title;
    @attr('string') company;
    @attr() achievements;
}