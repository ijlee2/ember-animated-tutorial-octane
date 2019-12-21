import Route from '@ember/routing/route';

export default class SearchRoute extends Route {
    model() {
        return this.store.loadRecords('skill');
    }

    setupController(controller, model) {
        super.setupController(...arguments);

        controller.query = '';

        controller.selectedSkills = [];

        controller.availableSkills = model.map(skill => {
            const { id, name, category, synonyms } = skill;

            return {
                id,
                name,
                category,
                synonyms: (synonyms || []).map(synonym => {
                    return (synonym || '').trim().toLowerCase();
                }),
                isSelected: false,
            };
        });

        controller.filteredAvailableSkills = controller.availableSkills;
    }
}