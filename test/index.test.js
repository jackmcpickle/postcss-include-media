const postcss = require('postcss');
const fs = require('fs');
const plugin = require('..');

const input = fs.readFileSync('./test/input.css', 'utf8');
const output = fs.readFileSync('./test/output.css', 'utf8');

async function run(input, opts = {}) {
    return await postcss([plugin(opts)]).process(input, { from: undefined });
}

const breakpoints = {
    sm: '350px',
    md: '700px',
    lg: '1000px',
    xl: '1200px',
    rem: '123rem',
    em: '456em',
};

const unitIntervals = {
    px: 5,
};

const mediaExpressions = {
    all: 'all',
    print: 'print',
    retina3x: '(-webkit-min-device-pixel-ratio: 3), (min-resolution: 3dppx)',
};

describe('@include-media', () => {
    it('Should handle positive use cases', async () => {
        const result = await run(input, { breakpoints, unitIntervals, mediaExpressions });
        expect(result.css).toEqual(output);
        expect(result.warnings()).toHaveLength(0);
    });

    it('Should handle negative operators case', async () => {
        const badInput = `@include-media('=md') { .test { content: '' } }`;
        const negativeOutput = `@media ('=md') { .test { content: '' } }`;
        const result = await run(badInput, { breakpoints, unitIntervals, mediaExpressions });
        expect(result.css).toEqual(negativeOutput);
        expect(result.warnings()).toHaveLength(1);
    });

    it('Should handle negative breakpoint case', async () => {
        const badInput = `@include-media('>=wrong') { .test { content: '' } }`;
        const negativeOutput = `@media (min-width: wrong) { .test { content: '' } }`;
        const result = await run(badInput, { breakpoints, unitIntervals, mediaExpressions });
        expect(result.css).toEqual(negativeOutput);
        expect(result.warnings()).toHaveLength(1);
    });
});
