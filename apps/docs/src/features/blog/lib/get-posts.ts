import { posts } from '@/content';

export function getPosts(locale: string) {
  return posts.filter((post) => post.locale === locale);
}
