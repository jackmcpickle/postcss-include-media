export const UNITS = ['px', 'cm', 'mm', '%', 'ch', 'pc', 'in', 'em', 'rem', 'pt', 'ex', 'vw', 'vh', 'vmin', 'vmax'];

export const OPERATORS = ['>=', '>', '<=', '<', '≥', '≤'];

/**
 * Creates a list of static expressions or media types
 *
 *  @example - Creates a single media type (screen)
 *   $media-expressions: ('screen': 'screen');
 *
 *  @example - Creates a static expression with logical disjunction (OR operator)
 *   const media-expressions = {
 *     'retina2x': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
 *   };
 */
export const mediaExpressions = {
    screen: 'screen',
    print: 'print',
    all: 'all',
    handheld: 'handheld',
    landscape: '(orientation: landscape)',
    portrait: '(orientation: portrait)',
    retina2x: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)',
    retina3x: '(-webkit-min-device-pixel-ratio: 3), (min-resolution: 350dpi), (min-resolution: 3dppx)',
};

/**
 * Defines a number to be added or subtracted from each unit when declaring
 * breakpoints with exclusive intervals
 * @example - Interval for pixels is defined as `1` by default
 * @include-media('>128px') {}
 *
 * Generates:
 * @media (min-width: 129px) {}
 */
export const unitIntervals = {
    px: 1,
    em: 0.01,
    rem: 0.1,
    '': 0,
};
