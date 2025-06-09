export default function MainButton({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <input type="submit" value={children} className={`btn btn-main ${className}`} />;
}
