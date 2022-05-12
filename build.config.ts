import { build } from 'esbuild';
import functionList from './functions';

functionList.functions.map(({path, name}) => {
    const functionPath = `./src/Functions/${path}/index.ts`;
    build({
        minify: true,
        bundle: false,  // update this once i get layers working https://medium.com/@anjanava.biswas/nodejs-runtime-environment-with-aws-lambda-layers-f3914613e20e
        keepNames: true,
        sourcemap: true,
        sourcesContent: false,
        target: 'node14',
        platform: 'node',
        outdir: `dist/${name}`,
        entryPoints: [functionPath],
      }).catch(() => process.exit(1))
})