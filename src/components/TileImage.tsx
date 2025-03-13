export default function TileImage({
  tile,
  hover = true,
}: {
  tile: number;
  hover?: boolean;
}) {
  return (
    <div
      className={`h-full transition-all bg-white rounded overflow-hidden ${hover && "hover:scale-110"}`}
    >
      <img
        src={`/tiles/${tile}.png`}
        alt="牌"
        className={`h-full object-contain ${hover && "hover:opacity-80"}`}
      />
    </div>
  );
}
