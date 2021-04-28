# PostCSS Include Media

[![NPM version](https://img.shields.io/npm/v/postcss-include-media.svg)](https://www.npmjs.org/package/postcss-include-media) ![Tests](https://github.com/jackmcpickle/postcss-include-media/actions/workflows/test.yml/badge.svg)

[PostCSS] plugin to output css `@media` definitions based on SASS mixin [include-media] format

### Features

- Flexible declaration of breakpoints
- Smart support for media types
- On-the-fly breakpoints
- Supports most postcss plugins

#### Contents
- [Install](#Install)
- [Options](#Options)
- [Examples](#Examples)
- [Credits](#Credits)

## Install

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-include-media
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
+ const postcssIncludeMedia = require('postcss-include-media');

module.exports = {
  plugins: [
+   postcssIncludeMedia(),
    require('autoprefixer')
  ]
}
```

## Options

### `breakpoints`

If you want to change them or add more, you can simply re-declare breakpoints using the Sass map syntax.

*type* `Record<key: string>`

*optional*: `true`

*defaults:*
```js
{ phone: '320px', tablet: '768px', desktop: '1024px' }
```
*usage:*
```js
postcssIncludeMedia({
    breakpoints: {
        md: '700px',
        xl: '1200px,
    }
}),

```

### `mediaExpressions`
Media types and static expressions are optional and automatically deferred. The list of media types can be modified by declaring `mediaExpressions`.

Expressions containing logical disjunctions, such as [Chris Coyier's retina declaration], are correctly handled, even when combined with other media types or breakpoints.

*type* `Record<key: string>`

*optional*: `true`

*defaults:*
```js
{
    screen: 'screen',
    print: 'print',
    all: 'all',
    handheld: 'handheld',
    landscape: '(orientation: landscape)',
    portrait: '(orientation: portrait)',
    retina2x: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)',
    retina3x: '(-webkit-min-device-pixel-ratio: 3), (min-resolution: 350dpi), (min-resolution: 3dppx)',
}
```
*usage:*
```js
postcssIncludeMedia({
    mediaExpressions: {
        retina: '(-webkit-min-device-pixel-ratio: 2)',
    }
}),

```

### `unitIntervals`
Defines a number to be added or subtracted from each unit when declaring breakpoints with inclusive/exclusive intervals

*type* `Record<key: number>`

*optional*: `true`

*defaults:*
```js
{
    px: 1,
    em: 0.01,
    rem: 0.1,
    '': 0,
}
```
*usage:*
```js
postcssIncludeMedia({
    unitIntervals: {
        '%': 1,
    }
}),

```


## Examples

*Input*
```css
@include-media('>=phone') {
    .foo {
        /* Input example */
    }
}

@include-media('<desktop') {
    .bar {
        /* Input example */
    }
}
```
*Output*
```css
@media (min-width: 320px) {
    .foo {
        /* Output example */
    }
}

@media (max-width: 1023px) {
    .bar {
        /* Input example */
    }
}
```
*Input*
```css
@include-media('>123px') {
    .foo {
        /* Input example */
    }
}
```
*Output*
```css
@media (min-width: 124px) {
    .foo {
        /* Output example */
    }
}

```
*Input*
```css
@include-media('>=desktop', 'retina2x') {
    .foo {
        /* Input example */
    }
}
```
*Output*
```css
@media (min-width: 1024px) and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)  {
    .foo {
        /* Output example */
    }
}

```

## Credits

Credit to the original Authors of [include-media] both [Eduardo Boucas] and [Kitty Giraudel]


[official docs]: https://github.com/postcss/postcss#usage
[PostCSS]: https://github.com/postcss/postcss
[include-media]: https://github.com/eduardoboucas/include-media/
[Eduardo Boucas]: https://github.com/eduardoboucas
[Kitty Giraudel]: https://github.com/KittyGiraudel
[Chris Coyier's retina declaration]: https://css-tricks.com/snippets/css/retina-display-media-query/
