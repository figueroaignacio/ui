import { allPosts as rawPosts } from 'content-collections';

export const posts = Array.isArray(rawPosts) ? rawPosts : [];

export function getPostsBySlug(slug: string, locale: string) {
  return posts.find((post) => post.slugAsParams === slug && post.locale === locale);
}
