import { build } from 'esbuild';
import functionList from './functions';

functionList.functions.map(({path, name}) => {
    const functionPath = `./src/Functions/${path}/index.ts`;
    build({
        minify: true,
        bundle: true,
        keepNames: true,
        sourcemap: true,
        sourcesContent: false,
        target: 'node14',
        platform: 'node',
        outdir: `dist/${name}`,
        entryPoints: [functionPath],
      }).catch(() => process.exit(1))
})