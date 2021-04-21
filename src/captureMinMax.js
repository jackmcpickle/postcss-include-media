import { OPERATORS } from './constants';

export const captureOperator = (string) => {
    const reg = new RegExp(`([${OPERATORS.join('')}]+)`);
    const actions = string.match(reg) || [''];
    return actions[0];
};

export const getMinMax = (action) => {
    switch (action) {
        case '>':
        case '>=':
        case '≥':
            return 'min';
        case '<':
        case '<=':
        case '≤':
            return 'max';
        default:
            return '';
    }
};
