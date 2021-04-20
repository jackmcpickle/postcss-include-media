const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

const breakpoints = {
  sm: '350px',
  md: '600px',
  lg: '1200px',
};

const source = `
  @include-media(">md") {
    .a {
      display: flex;
    }

    .b {
      display: none;
    }
  }
`;

const output = `
  @media(min-width: 600px) {
    .a {
      display: flex;
    }

    .b {
      display: none;
    }
  }
`

it('does something', async () => {
  await run(source, output, { breakpoints })
});
