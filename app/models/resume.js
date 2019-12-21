import Model, { belongsTo, hasMany } from '@ember-data/model';

export default class ResumeModel extends Model {
    @hasMany('degree', { async: false }) degrees;
    @hasMany('experience', { async: false }) experiences;
    @hasMany('skill', { async: false }) skills;

    @belongsTo('student') student;
}