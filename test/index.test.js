const postcss = require('postcss');
const postcssNesting = require('postcss-nesting');
const fs = require('fs');
const plugin = require('..');

const input = fs.readFileSync('./test/input.css', 'utf8');
const output = fs.readFileSync('./test/output.css', 'utf8');

async function run(input, opts = {}) {
    return await postcss([postcssNesting, plugin(opts)]).process(input, { from: undefined });
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

    it('Should handle rule name change', async () => {
        const inputBananas = `@banana ('>=phone') { .test { content: '' } }`;
        const output = `@media (min-width: 320px) { .test { content: '' } }`;
        const result = await run(inputBananas, { ruleName: 'banana' });
        expect(result.css).toEqual(output);
        expect(result.warnings()).toHaveLength(0);
    });

    it('Should handle rule name change with spaces', async () => {
        const inputWithSpace = `@include media ('>=phone') { .test { content: '' } }`;
        const output = `@media (min-width: 320px) { .test { content: '' } }`;
        const result = await run(inputWithSpace, { ruleName: 'include media' });
        expect(result.css).toEqual(output);
        expect(result.warnings()).toHaveLength(0);
    });

    it('Should handle nesting with @postcss-nesting', async () => {
        const inputWithNesting = `.test { content: 'a'; @include-media ('>=phone') { content: 'b' } }`;
        const output = `.test { content: 'a' }@media (min-width: 320px) { .test { content: 'b' } }`;
        const result = await run(inputWithNesting, {});
        // Postcss-nesting does strange things with the linebreaks, so we need to remove the linebreaks
        const resultRemovedLineBreaks = result.css.replace(/(\r\n|\n|\r)/gm, '');
        expect(resultRemovedLineBreaks).toEqual(output);
        expect(result.warnings()).toHaveLength(0);
    });
});
