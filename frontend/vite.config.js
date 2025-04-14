import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import prettier from 'vite-plugin-prettier';
export default defineConfig({
    plugins: [react(), tailwindcss(), prettier()],
    server: {
        port: 3131,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
