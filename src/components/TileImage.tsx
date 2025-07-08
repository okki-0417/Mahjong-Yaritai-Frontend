export default function TileImage({
  tile,
  hover = true,
  className,
}: {
  tile: number;
  hover?: boolean;
  className?: string;
}) {
  return (
    <img
      src={`/tiles/${tile}.webp`}
      alt=""
      draggable="false"
      className={`h-full object-contain transition-all rounded ${className} ${hover && "hover:scale-110"}`}
      loading="lazy"
    />
  );
}
