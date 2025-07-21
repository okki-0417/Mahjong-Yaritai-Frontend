import Image from "next/image";

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
    <Image
      width={49}
      height={63}
      src={`/tiles/${tileId || tile}.webp`}
      alt=""
      draggable="false"
      className={`h-full aspect-7/9 object-contain transition-all rounded ${className} ${hover && "hover:scale-110"}`}
      loading="lazy"
    />
  );
}
