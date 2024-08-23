/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
                dela: ['Dela Gothic One', 'cursive'],
                noto: ['Noto Sans JP', 'sans-serif'],
                reddit: ['Reddit Mono', 'sans-serif'],
                sawarabi: ['Sawarabi Mincho', 'sans-serif'],
              },
        },
    },
    plugins: [],
}
