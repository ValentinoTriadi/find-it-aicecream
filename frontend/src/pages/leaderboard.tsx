import { Medal } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth.context";
import { fetchLeaderboard, fetchCurrentUser } from "@/api/leaderboard";
import { cn } from "../lib/utils";

const TOP_X = 10;
const AVATAR_WIDTH = 80;
const AVATAR_HEIGHT = 80;

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    Promise.all([
      fetchLeaderboard(TOP_X),
      fetchCurrentUser(user.id),
    ])
      .then(([topUsers, currentUserData]) => {
        setLeaderboardData(topUsers);
        setCurrentUser(currentUserData);
      })
      .finally(() => setLoading(false));
  }, [user]);

  // Sort and get top X users (sudah diurutkan dari DB, tapi jaga-jaga)
  const topUsers = leaderboardData
    .sort((a, b) => b.experience - a.experience)
    .slice(0, TOP_X)
    .map((user, index) => ({
      ...user,
      badge:
        index === 0
          ? "gold"
          : index === 1
          ? "silver"
          : index === 2
          ? "bronze"
          : undefined,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.nama
      )}&background=random&size=${AVATAR_HEIGHT}`,
    }));

  // Find current user data
  const currentUserData = leaderboardData.find((u) => u.id === currentUser?.id) || currentUser;
  const currentUserRank =
    leaderboardData
      .sort((a, b) => b.experience - a.experience)
      .findIndex((u) => u.id === currentUser?.id) + 1;

  // Add badge and avatar to current user if not in top X
  const enhancedCurrentUser = currentUserData
    ? {
        ...currentUserData,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          currentUserData.nama
        )}&background=random&size=${AVATAR_HEIGHT}`,
        badge:
          currentUserRank <= 3
            ? currentUserRank === 1
              ? "gold"
              : currentUserRank === 2
              ? "silver"
              : "bronze"
            : undefined,
      }
    : null;

  if (loading) {
    return <div className="p-8 text-center">Loading leaderboard...</div>;
  }

  return (
    <div className="flex-1 overflow-auto relative">
      <div className="p-4 mx-auto pb-24">
        <h1 className="text-3xl font-bold text-[#0a2540] mb-6">Leaderboard</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 py-3 px-4 bg-card text-sm font-medium text-dark-blue">
            <div className="col-span-1">Rank</div>
            <div className="col-span-7">User</div>
            <div className="col-span-4 text-right">XP Points</div>
          </div>

          <div className="divide-y divide-gray-100">
            {topUsers.map((user, index) => (
              <div
                key={user.id}
                className={cn(
                  "grid grid-cols-12 py-3 px-4 items-center",
                  user.id === currentUser?.id ? "bg-blue-50" : ""
                )}
              >
                <div className="col-span-1 font-medium text-gray-700">
                  #{index + 1}
                </div>
                <div className="col-span-7 flex items-center space-x-3">
                  <UserWithAvatar
                    user={user}
                    isCurrent={user.id === currentUser?.id}
                  />
                </div>
                <div className="col-span-4 text-right font-medium">
                  {user.experience?.toLocaleString() ?? 0} XP
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating user bar */}
      {enhancedCurrentUser && (
        <div className="fixed bottom-10 left-64 right-0  ">
          <div className="max-w-4xl mx-auto px-8">
            <div className="bg-card border shadow-md rounded-xl overflow-hidden mx-auto">
              <div className="grid grid-cols-12 items-center py-3 px-4">
                <div className="col-span-1 font-medium text-dark-blue">
                  #{currentUserRank}
                </div>
                <div className="col-span-7 flex items-center space-x-3 text-dark-blue font-medium">
                  <UserWithAvatar user={enhancedCurrentUser} isCurrent />
                </div>
                <div className="col-span-4 text-right text-dark-blue font-medium">
                  {enhancedCurrentUser.experience?.toLocaleString() ?? 0} XP
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Avatar component with badge
function UserWithAvatar({
  user,
  isCurrent,
}: {
  user: { avatar: string; nama: string; badge?: string };
  isCurrent?: boolean;
}) {
  return (
    <>
      <div className="relative">
        <div
          className={`w-${AVATAR_WIDTH / 10} h-${AVATAR_HEIGHT / 10} rounded-full overflow-hidden`}
        >
          <img
            src={user.avatar}
            alt={`${user.nama}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>
        {user.badge && (
          <div
            className={cn(
              "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
              user.badge === "gold"
                ? "bg-yellow-400"
                : user.badge === "silver"
                ? "bg-gray-300"
                : "bg-amber-600"
            )}
          >
            <Medal size={12} className="text-white" />
          </div>
        )}
      </div>
      <span
        className={cn(
          "font-medium",
          isCurrent ? "text-dark-blue" : "text-gray-800"
        )}
      >
        {user.nama}
        {isCurrent && " (You)"}
      </span>
    </>
  );
}
