import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

let outputFolder = 'lib/';
let outputDocsFolder = 'docs/assets/js/';
let inputFolder = 'src/';
let name = 'Magneto';

export default [
    {
        input: inputFolder + 'index.js',
        output: {
            file: outputDocsFolder + 'magneto.min.js',
            format: 'umd',
            name: name
        },
        plugins: [
            resolve(),
            babel({
                exclude: 'node_modules/**'
            }),
            terser()
        ]
    },
    {
        input: inputFolder + 'index.js',
        output: {
            file: outputFolder + 'magneto.min.js',
            format: 'umd',
            name: name
        },
        plugins: [
            resolve(),
            babel({
                exclude: 'node_modules/**'
            }),
            terser()
        ]
    }
];
