interface IListPageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function ListPageHeader({ title, children }: IListPageHeaderProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
      {children}
    </div>
  );
}
