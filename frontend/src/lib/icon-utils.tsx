import {
  Globe,
  Utensils,
  BookOpen,
  Camera,
  Coffee,
  Film,
  Gift,
  Music,
  ShoppingCart,
  Smile,
  Smartphone,
  Plane,
} from "lucide-react";


const ICON_LIST = [
  Plane,
  Utensils,
  ShoppingCart,
  Globe,
  BookOpen,
  Camera,
  Coffee,
  Film,
  Gift,
  Music,
  Smile,
  Smartphone,
];
const COLOR_PALETTE = [
  "#5cb176",
  "#ffc83d",
  "#ef5261",
  "#87ceeb",
  "#d980fa",
  "#f8774a",
  "#3ddbd9",
  "#f2a65a",
  "#a1e44d",
  "#ff6f91",
  "#6aace4",
  "#f4c1f4",
];

 interface Topic {
  id: number;
  name: string;
  description?: string;
}

interface DecoratedTopic extends Topic {
  icon: JSX.Element;
  color: string;
  bgColor: string;
}

export function decorateTopics(topics: Topic[]): DecoratedTopic[] {
  return topics.map((t, idx) => {
    const IconComp = ICON_LIST[idx % ICON_LIST.length];
    const color = COLOR_PALETTE[idx % COLOR_PALETTE.length];
    return {
      ...t,
      icon: <IconComp className="text-white w-8 h-8" />,  
      color,
      bgColor: color,
    };
  });
}
