import { Edit, LogOut, Star, Trophy } from "lucide-react";

import { Button } from "../ui/button";

import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProfileHeaderProps {
  name: string;
  joinDate: string;
  achievementsUnlocked: number;
  exp: number;
  handleLogout: () => void;
}

export default function ProfileHeader({
  name,
  joinDate,
  achievementsUnlocked,
  exp,
  handleLogout,
}: ProfileHeaderProps) {
  return (
    <div className="rounded-xl overflow-hidden bg-card">
      <div className="h-24 bg-gradient-to-r from-[#243452] to-[#64B5E1] relative">
        <div className="absolute -bottom-12 left-8">
          {/* <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white"></div> */}
          <Avatar className="w-24 h-24 border-4 border-white">
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
            <AvatarFallback className="bg-white text-dark-blue font-bold text-3xl">
              {name ? name.split(" ")[0][0] + name.split(" ")[1]?.[0] : "📖"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="pt-16 pb-6 px-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-dark-blue">{name}</h1>
            <p className="text-gray-500">
              Joined{" "}
              {format(joinDate ? new Date(joinDate) : new Date(), "MMMM yyyy")}
            </p>
            <div className="flex gap-6 mt-3 text-gray-600">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-stronger-blue" />
                <span>{achievementsUnlocked} achievements</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-stronger-blue" />
                <span>{exp} exp</span>
              </div>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant={"ghost"}
            className="flex items-center gap-1 px-3 py-1.5 border-destructive bg-card text-destructive  rounded-md border text-sm font-medium hover:text-destructive  hover:bg-red-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
