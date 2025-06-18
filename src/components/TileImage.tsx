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
    <div className={`h-full transition-all rounded overflow-hidden ${hover && "hover:scale-110"}`}>
      <img
        src={`/tiles/${tile}.webp`}
        alt=""
        draggable="false"
        className={`h-full object-contain ${className} ${hover && "hover:opacity-80 bg-white"}`}
        loading="lazy"
      />
    </div>
  );
}
