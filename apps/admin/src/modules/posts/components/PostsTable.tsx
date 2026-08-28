'use client';

import type { IPostListItem } from '../types/admin.types';
import { PostsTableRow } from './PostsTableRow';

interface IPostsTableProps {
  posts: IPostListItem[];
}

export function PostsTable({ posts }: IPostsTableProps): React.JSX.Element {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-500 uppercase sm:px-6"
              >
                Título
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-500 uppercase sm:px-6"
              >
                Estado
              </th>
              <th
                scope="col"
                className="hidden px-4 py-3 text-xs font-semibold tracking-wide text-slate-500 uppercase md:table-cell md:px-6"
              >
                Categoría
              </th>
              <th
                scope="col"
                className="hidden px-4 py-3 text-xs font-semibold tracking-wide text-slate-500 uppercase sm:table-cell sm:px-6"
              >
                Autor
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-500 uppercase sm:px-6"
              >
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <PostsTableRow key={post.id} post={post} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
