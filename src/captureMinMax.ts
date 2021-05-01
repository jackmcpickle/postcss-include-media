import { OperatorsType } from '../index.d';
import { OPERATORS } from './constants';

export const captureOperator = (string: string): OperatorsType => {
    const reg = new RegExp(`([${OPERATORS.join('')}]+)`);
    const actions = string.match(reg) || [''];
    return actions[0];
};

export const getMinMax = (action: string): string => {
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
