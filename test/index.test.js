const postcss = require('postcss');
const fs = require('fs');
const plugin = require('..');

const input = fs.readFileSync('./test/input.css', 'utf8');
const output = fs.readFileSync('./test/output.css', 'utf8');

async function run(input, output, opts = {}) {
    let result = await postcss([plugin(opts)]).process(input, { from: undefined });
    expect(result.css).toEqual(output);
    expect(result.warnings()).toHaveLength(0);
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
    it('Should handle basic case', async () => {
        await run(input, output, { breakpoints, unitIntervals, mediaExpressions });
    });
});
