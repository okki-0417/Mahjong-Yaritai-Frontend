export default function TileImage({tile}: {tile: number}) {
  return (
    <img src={`/tiles/${tile}.png`} alt="牌" className="h-full object-contain" />
  )
}
