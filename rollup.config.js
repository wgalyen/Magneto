import babel from 'rollup-plugin-babel';

let outputFolder = 'lib/';
let outputDocsFolder = 'docs/assets/js/';
let inputFolder = 'src/';
let name = 'Magneto';

let pluginOptions = [
    babel({
        exclude: 'node_modules/**',
    })
];

export default [
    {
        input: inputFolder + 'index.js',
        output: {
            file: outputFolder + 'magneto.es.js',
            format: 'iife',
            name: name
        }
    },
    {
        input: inputFolder + 'index.js',
        output: {
            file: outputDocsFolder + 'magneto.es.js',
            format: 'iife',
            name: name
        }
    },
    {
        input: inputFolder + 'index.js',
        output: {
            file: outputFolder + 'magneto.js',
            format: 'umd',
            name: name
        },
        plugins: pluginOptions
    }
];
