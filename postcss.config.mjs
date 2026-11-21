// Tailwind CSS v3 を PostCSS 経由で読み込む。
// @astrojs/tailwind は Astro 6 以降に対応していないため、同等の構成を直接設定している。
export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}
