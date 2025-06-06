import { fetchCurrentUser, fetchLeaderboard } from '@/api/leaderboard';
import SimpleLoading from '@/components/loading';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth.context';
import { Crown, Medal, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '../lib/utils';

// Configuration
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

    Promise.all([fetchLeaderboard(TOP_X), fetchCurrentUser(user.id)])
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
          ? 'gold'
          : index === 1
            ? 'silver'
            : index === 2
              ? 'bronze'
              : undefined,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.nama,
      )}&background=random&size=${AVATAR_HEIGHT}`,
    }));

  // Find current user data
  const currentUserData =
    leaderboardData.find((u) => u.id === currentUser?.id) || currentUser;
  const currentUserRank =
    leaderboardData
      .sort((a, b) => b.experience - a.experience)
      .findIndex((u) => u.id === currentUser?.id) + 1;

  // Add badge and avatar to current user if not in top X
  const enhancedCurrentUser = currentUserData
    ? {
        ...currentUserData,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          currentUserData.nama,
        )}&background=random&size=${AVATAR_HEIGHT}`,
        badge:
          currentUserRank <= 3
            ? currentUserRank === 1
              ? 'gold'
              : currentUserRank === 2
                ? 'silver'
                : 'bronze'
            : undefined,
      }
    : null;

  if (loading) {
    return <SimpleLoading />;
  }
  const getAvatarColor = (initials: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-600',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-teal-500',
    ];

    // Simple hash function to consistently assign colors
    const hash = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="flex-1 overflow-auto relative px-10">
      <div className="py-4 w-full mx-auto pb-24">
        <h1 className="text-3xl font-bold text-more-stronger-blue mb-6">
          Leaderboard
        </h1>

        <div className="hidden md:flex justify-center items-end mb-12 mt-8">
          {/* 2nd Place */}
          <div className="flex flex-col items-center mx-4">
            <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
              <AvatarFallback
                className={`${getAvatarColor('WW')} text-white text-lg`}
              >
                WW
              </AvatarFallback>
            </Avatar>
            <div className="mt-2 text-center">
              <Badge className="bg-slate-400 mb-1">
                <Medal className="h-3 w-3 mr-1" />
                2nd
              </Badge>
              <p className="font-medium">{topUsers[1].nama}</p>
              <p className="text-sm text-blue-600 font-semibold">
                {topUsers[1].experience} XP
              </p>
            </div>
            <div className="h-24 w-20 bg-slate-200 dark:bg-slate-700 rounded-t-lg mt-3 flex items-center justify-center">
              <span className="text-2xl font-bold text-slate-500">2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center mx-4 -mb-4">
            <div className="mb-2">
              <Crown className="h-6 w-6 text-amber-500" />
            </div>
            <Avatar className="h-20 w-20 border-2 border-amber-500 shadow-lg">
              <AvatarFallback
                className={`${getAvatarColor('LC')} text-white text-xl`}
              >
                LC
              </AvatarFallback>
            </Avatar>
            <div className="mt-2 text-center">
              <Badge className="bg-amber-500 mb-1">
                <Trophy className="h-3 w-3 mr-1" />
                1st
              </Badge>
              <p className="font-medium">{topUsers[0].nama}</p>
              <p className="text-sm text-blue-600 font-semibold">
                {topUsers[0].experience} XP
              </p>
            </div>
            <div className="h-32 w-24 bg-amber-200 dark:bg-amber-900/50 rounded-t-lg mt-3 flex items-center justify-center">
              <span className="text-3xl font-bold text-amber-600">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center mx-4">
            <Avatar className=" h-16 w-16 border-2 border-white shadow-lg">
              <AvatarFallback
                className={`${getAvatarColor('PP')} text-white text-lg`}
              >
                PP
              </AvatarFallback>
            </Avatar>
            <div className="mt-2 text-center">
              <Badge className="bg-amber-700 mb-1">
                <Medal className="h-3 w-3 mr-1" />
                3rd
              </Badge>
              <p className="font-medium">{topUsers[2].nama}</p>
              <p className="text-sm text-blue-600 font-semibold">
                {topUsers[2].experience} XP
              </p>
            </div>
            <div className="h-16 w-20 bg-amber-800/20 dark:bg-amber-800/40 rounded-t-lg mt-3 flex items-center justify-center">
              <span className="text-2xl font-bold text-amber-800/70">3</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 py-3 px-4  bg-more-stronger-blue text-sm  text-white font-semibold ">
            <div className="col-span-1">Rank</div>
            <div className="col-span-7">User</div>
            <div className="col-span-4 text-right">XP Points</div>
          </div>

          <div className="divide-y divide-gray-100">
            {topUsers.map((user, index) => (
              <div
                key={user.id}
                className={cn(
                  'grid grid-cols-12 py-3 px-4 items-center',
                  user.id === currentUser?.id ? 'bg-blue-50' : '',
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
                <div className="col-span-4 text-more-stronger-blue text-right font-medium">
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
          <div className="w-full px-10">
            <div className="bg-blue-300 border shadow-md rounded-xl overflow-hidden w-full">
              <div className="grid grid-cols-12 items-center py-3 px-4">
                <div className="col-span-1 font-medium text-dark-blue">
                  #{currentUserRank}
                </div>
                <div className="col-span-7 flex items-center space-x-3 text-dark-blue font-medium">
                  <UserWithAvatar user={enhancedCurrentUser} isCurrent />
                </div>
                <div className="col-span-4 text-right text-more-stronger-blue font-semibold">
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
          className={`w-${AVATAR_WIDTH / 10} h-${
            AVATAR_HEIGHT / 10
          } rounded-full overflow-hidden`}
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
              'absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center',
              user.badge === 'gold'
                ? 'bg-yellow-400'
                : user.badge === 'silver'
                  ? 'bg-gray-300'
                  : 'bg-amber-600',
            )}
          >
            <Medal size={12} className="text-white" />
          </div>
        )}
      </div>
      <span
        className={cn(
          'font-medium',
          isCurrent ? 'text-dark-blue' : 'text-gray-800',
        )}
      >
        {user.nama}
        {isCurrent && ' (You)'}
      </span>
    </>
  );
}
