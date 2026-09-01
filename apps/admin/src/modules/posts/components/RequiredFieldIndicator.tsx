export function RequiredFieldIndicator(): React.JSX.Element {
  return (
    <span className="text-destructive" aria-hidden="true">
      {' '}
      *
    </span>
  );
}
