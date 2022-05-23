import { build } from 'esbuild';
import functionList from './functions';


const common = {
  minify : true,
  bundle: false, 
  keepNames: true,
        sourcemap: true,
        sourcesContent: false,
        target: 'node14',
}

// lambda functions
functionList.functions.map(({path, name}) => {
    const functionPath = `./src/Functions/${path}/index.ts`;
    build({
        outdir: `dist/${name}`,
        entryPoints: [functionPath],
        platform: 'node',
        format: 'cjs',
        ...common
      }).catch(() => process.exit(1))
})



// layer functions
build({
  
  outdir: `src/CommonLayer/nodejs/Utilities/Connect`,
  entryPoints: ['./src/CommonLayer/Utilities/Connect/index.ts'],
  platform: 'node',
  format: 'cjs',
  ...common
}).catch(() => process.exit(1))