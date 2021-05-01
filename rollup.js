import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'index.ts',
    output: [
        { file: 'index.cjs.js', format: 'cjs', sourcemap: true, exports: 'default' },
        { file: 'index.es.mjs', format: 'es', sourcemap: true, exports: 'default' },
    ],
    plugins: [
        typescript(),
        babel({
            babelHelpers: 'bundled',
            plugins: ['@babel/plugin-syntax-dynamic-import'],
            presets: [['@babel/env', { modules: false, targets: { node: 12 } }]],
        }),
    ],
};
