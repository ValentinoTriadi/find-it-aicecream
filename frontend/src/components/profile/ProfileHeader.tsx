import { format } from "date-fns";
import { Flame, LogOut, Settings, Star, Trophy } from "lucide-react";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ProfileHeaderProps {
  name: string;
  joinDate: string;
  achievementsUnlocked: number;
  exp: number;
  dayStreak: 14;
  handleLogout: () => void;
}

export default function ProfileHeader({
  name,
  joinDate,
  achievementsUnlocked,
  exp,
  dayStreak,
  handleLogout,
}: ProfileHeaderProps) {
  return (
    <div className="overflow-hidden bg-transparent">
      <div className="h-40 bg-gradient-to-r from-[#001B2E] bg-[#1e5675] relative ">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-white/20 rounded-full p-3 absolute right-4 top-4">
            <Settings className="text-white text-sm" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <Button
              onClick={handleLogout}
              variant={"ghost"}
              className="flex items-center w-full gap-1 px-3 py-1.5 border-destructive bg-transparent text-destructive  rounded-md border text-sm font-medium hover:text-destructive  hover:bg-red-200"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="absolute -bottom-12 left-8">
          {/* <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white"></div> */}
          <Avatar className="w-32 h-32 shadow-md border-4 border-white">
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
            <AvatarFallback className="bg-white text-dark-blue font-bold text-3xl">
              {name ? name.split(" ")[0][0] + name.split(" ")[1]?.[0] : "📖"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="pt-16 pb-6 px-8 bg-transparent">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-dark-blue">{name}</h1>
            <p className="text-gray-500">
              Joined{" "}
              {format(joinDate ? new Date(joinDate) : new Date(), "MMMM yyyy")}
            </p>
            <div className="flex gap-6 mt-3 text-gray-600">
              <div className="flex items-center gap-2 text-yellow-500">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">
                  {achievementsUnlocked} achievements
                </span>
              </div>
              <div className="flex items-center gap-2 text-stronger-blue">
                <Star className="w-5 h-5 " />
                <span className="font-semibold">{exp} exp</span>
              </div>
              <div className="flex items-center gap-2 text-red-500">
                <Flame className="w-5 h-5 " />
              <span className="font-semibold">{dayStreak} day streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
