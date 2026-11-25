import type { ImageMetadata } from 'astro';

/**
 * 記事のサムネイル（heroImage）と About ページの画像は src/assets/blog-assets/ に置き、
 * Astro の画像最適化（<Image>）で表示サイズに合った幅の webp を build 時に生成する。
 *
 * frontmatter の heroImage は従来どおり "/blog-assets/<記事>/<ファイル>" と書く。
 * 同じパスの画像が src/assets/blog-assets/ にあればそれを使い、
 * 無ければ public/ の画像をそのまま使う（最適化されないだけで表示はされる）。
 *
 * public/ 全体を glob すると、使っていない画像まで dist/_astro に複製されるため、
 * 対象は src/assets/blog-assets/ に限定している。
 */
const blogAssets = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/blog-assets/**/*.{webp,jpg,jpeg,png,avif}',
);

export async function resolveBlogImage(publicPath: string | undefined): Promise<ImageMetadata | undefined> {
  if (!publicPath?.startsWith('/blog-assets/')) return undefined;
  const loader = blogAssets[`/src/assets${publicPath}`];
  return loader ? (await loader()).default : undefined;
}
