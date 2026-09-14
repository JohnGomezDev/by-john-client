import { PostsCategoriesNav } from './PostsCategoriesNav';
import { PostsSearchForm } from './PostsSearchForm';

export function PostsSidebar(): React.JSX.Element {
  return (
    <aside className="flex w-full flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <PostsSearchForm />
      <PostsCategoriesNav />
    </aside>
  );
}
