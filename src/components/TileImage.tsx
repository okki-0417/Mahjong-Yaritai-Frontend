export default function TileImage({ tile, hover = true }: { tile: number; hover?: boolean }) {
  return (
    <div
      className={`h-full transition-all hover:bg-white rounded overflow-hidden ${hover && "hover:scale-110"}`}>
      <img
        src={`/tiles/${tile}.webp`}
        alt=""
        draggable="false"
        className={`h-full object-contain ${hover && "hover:opacity-80"}`}
      />
    </div>
  );
}
