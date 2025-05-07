import { useAuth } from "@/context/auth.context";
import { cn } from "@/lib/utils";
import { Award, BarChart3, BookOpen, Swords } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "./ui/sidebar";

interface UserProfile {
  name: string;
  role: string;
  avatarUrl: string;
}

export default function AppSidebar() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Maulana Firdaus",
    role: "Student",
    avatarUrl: "/images/maul.webp",
  });

  const auth = useAuth();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="text-white min-h-screen">
      <SidebarHeader className="">
        <Link
          to={"/profile"}
          className={cn(
            "p-4 flex items-center gap-3 rounded-md",
            isActive("/profile") && "bg-white/50 text-dark-blue"
          )}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-blue">
            <img
              src={profile.avatarUrl}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="font-bold truncate max-w-[150px] text-white">
              {auth.user?.user_metadata.nama}
            </h3>
            <p className="text-sm text-gray-300">{profile.role}</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between h-full">
        <SidebarGroup>
          <SidebarItem
            linkTo={"/battle-map"}
            icon={<Swords className="w-6 h-6" />}
            label={"Battle"}
          />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarItem
            linkTo={"/learn"}
            icon={<BookOpen className="w-6 h-6" />}
            label={"Learn"}
          />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarItem
            linkTo={"/leaderboard"}
            icon={<BarChart3 className="w-6 h-6" />}
            label={"Leaderboard"}
          />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarItem
            linkTo={"/achievements"}
            icon={<Award className="w-6 h-6" />}
            label={"Achievement"}
          />
        </SidebarGroup>

        <SidebarFooter className="mt-auto">
          <div className="p-4 flex items-center justify-center mt-auto ">
            <img src="/images/battletalk-logo.png" className="w-32" />
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}

interface SidebarItemProps {
  linkTo: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarItem = ({ linkTo, icon, label }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Link
      to={linkTo}
      className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
        isActive(linkTo) ? "bg-white/50 text-dark-blue" : "hover:bg-[#2A5A7C]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};
