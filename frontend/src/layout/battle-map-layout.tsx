import { BattleMapSubtopicProvider } from "@/context/battle-map.context";
import { useUser } from "@/context/user.context";
import { Outlet } from "react-router-dom";

export const BattleMapLayout = () => {
  return (
    <BattleMapSubtopicProvider>
      <Outlet />
    </BattleMapSubtopicProvider>
  );
};
