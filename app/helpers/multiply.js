import { helper } from '@ember/component/helper';

export default helper(function multiply(params) {
    if (params.length === 0) {
        return undefined;
    }

    return params.reduce((accumulator, num) => accumulator * num, 1);
});