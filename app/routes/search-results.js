import Route from '@ember/routing/route';

export default class SearchResultsRoute extends Route {
    queryParams = {
        sid: {
            refreshModel: true
        }
    };

    async model(params) {
        const { sid: skillIds } = params;

        if (skillIds) {
            const response = await fetch(`/search?skillIds=${skillIds}`);
            const payload = await response.json();

            return payload;
        }

        return [];
    }
}