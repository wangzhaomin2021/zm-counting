import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: 'src/counting.ts',
            name: 'counting',
            fileName: (format) => `counting.${format}.js`,
            formats: ['es']
        }
    }
})