import Model, { attr } from '@ember-data/model';

export default class SkillModel extends Model {
    @attr('string') name;
    @attr('string') category;
    @attr() synonyms;
}