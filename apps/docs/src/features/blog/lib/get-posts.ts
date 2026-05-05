import { allPosts as posts } from 'content-collections';

export function getPosts(locale: string) {
  return posts.filter((post) => post.locale === locale);
}
