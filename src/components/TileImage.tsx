export default function TileImage({
  tile,
  tileId,
  hover = true,
  className,
}: {
  tile?: number | string;
  tileId?: number | string;
  hover?: boolean;
  className?: string;
}) {
  return (
    <img
      src={`/tiles/${tileId || tile}.webp`}
      alt=""
      draggable="false"
      className={`h-full object-contain transition-all rounded ${className} ${hover && "hover:scale-110"}`}
      loading="lazy"
    />
  );
}
