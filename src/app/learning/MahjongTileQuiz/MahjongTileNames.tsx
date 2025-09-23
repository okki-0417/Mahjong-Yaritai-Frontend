import TileImage from "@/src/components/TileImage";
import tileNameById from "@/src/lib/utils/tileNameById";
import tileNickNameById from "@/src/lib/utils/tileNickNameById";
import { Box, Wrap } from "@chakra-ui/react";

export default function MahjongTileNames() {
  return (
    <Wrap>
      {Object.keys(tileNameById).map((key, index) => (
        <label htmlFor={`popup-${index}`} key={index} className="relative">
          <input id={`popup-${index}`} type="checkbox" className="peer" hidden />
          <p className="peer-checked:absolute fast-fade-in peer-checked:inline-block hidden -top-16 w-28 -left-1/2 text-center bg-mj-mat border-2 border-mj-mat-light  font-bold p-1 rounded z-20">
            <span className="lg:text-lg">{tileNameById[key]}</span>
            <br />
            <span className="text-sm">（{tileNickNameById[key]}）</span>
          </p>
          <Box>
            <TileImage tileId={key} />
          </Box>
        </label>
      ))}
    </Wrap>
  );
}
