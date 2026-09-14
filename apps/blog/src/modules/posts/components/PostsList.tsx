import type { IPostListItem } from '../types/posts.types';
import { PostCard } from './PostCard';

interface IPostsListProps {
  posts: IPostListItem[];
}

export function PostsList({ posts }: IPostsListProps): React.JSX.Element {
  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
