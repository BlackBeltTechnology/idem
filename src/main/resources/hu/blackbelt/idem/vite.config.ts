import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    base: '',
    resolve: {
        alias: [
            { find: '~', replacement: path.resolve(__dirname, 'src') },
        ],
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'idem',
            fileName: (format) => `idem.${format}.js`,
            formats: ['es', 'cjs', 'umd'],
        },
        rollupOptions: {
            // biome-ignore lint/suspicious/noExplicitAny: this is fine
            external: Object.keys((pkg as any).peerDependencies || {}),
        },
    },
    test: {
      coverage: {
        exclude: [
          'src/generated',
          'src/types',
          'src/index.ts',
          'dist',
          '**.config.ts',
        ],
      },
    },
    plugins: [
      dts({
        exclude: ['**/node_modules/**', '**/__tests__/**', '**/*.test.ts'],
      }),
    ],
}));
