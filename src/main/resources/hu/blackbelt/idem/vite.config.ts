import path from 'node:path';
import { defineConfig } from 'vite';

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
    },
}));
