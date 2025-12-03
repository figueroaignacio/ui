// Content
import { getLocale } from 'next-intl/server';
import { getPosts } from '../lib/get-posts';

// Components
import { PostCard } from './post-card';

export async function AllPosts() {
  const locale = await getLocale();
  const posts = getPosts(locale);

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.title}>
          <PostCard
            title={post.title}
            description={post.description}
            slug={post.slug}
            date={post.date}
          />
        </li>
      ))}
    </ul>
  );
}
