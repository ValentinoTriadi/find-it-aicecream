import { Award, BookOpen, Medal, Swords, Trophy } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import { cn } from '../lib/utils';

// Configuration
const TOP_X = 10;
const AVATAR_WIDTH = 80;
const AVATAR_HEIGHT = 80;

// Sample data for the leaderboard
const dummyLeaderboardData = [
  { id: 1, username: 'LinguaChamp', score: 9850 },
  { id: 2, username: 'WordWizard', score: 9720 },
  { id: 3, username: 'PolyglotPro', score: 9540 },
  { id: 4, username: 'VerbMaster', score: 9320 },
  { id: 5, username: 'SyntaxSage', score: 9150 },
  { id: 6, username: 'GrammarGuru', score: 8970 },
  { id: 7, username: 'PhrasePioneer', score: 8820 },
  { id: 8, username: 'AccentAce', score: 8640 },
  { id: 9, username: 'DialogueDiva', score: 8470 },
  { id: 10, username: 'VocabVirtuoso', score: 8320 },
  { id: 11, username: 'Maul Firdaus', score: 7950 },
  { id: 12, username: 'ToneTalent', score: 7840 },
];

const dummyCurrentUser = { id: 11, username: 'Maul Firdaus', rank: 'Beginner' };
export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState(dummyLeaderboardData);
  const [currentUser, setCurrentUser] = useState(dummyCurrentUser);

  // Sort and get top X users
  const topUsers = leaderboardData
    .sort((a, b) => b.score - a.score)
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
      // Generate avatar URL with dynamic dimensions
      avatar: `https://ui-avatars.com/api/?name=${user.username}&background=random&size=${AVATAR_HEIGHT}`,
    }));

  // Find current user data
  const currentUserData = leaderboardData.find((u) => u.id === currentUser.id);
  const currentUserRank =
    leaderboardData
      .sort((a, b) => b.score - a.score)
      .findIndex((u) => u.id === currentUser.id) + 1;

  // Add badge and avatar to current user if not in top X
  const enhancedCurrentUser = currentUserData
    ? {
        ...currentUserData,
        avatar: `https://ui-avatars.com/api/?name=${currentUser.username}&background=random&size=${AVATAR_HEIGHT}`,
        // Only add badge if in top 3
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
                  'grid grid-cols-12 py-3 px-4 items-center',
                  user.id === currentUser.id ? 'bg-blue-50' : '',
                )}
              >
                <div className="col-span-1 font-medium text-gray-700">
                  #{index + 1}
                </div>
                <div className="col-span-7 flex items-center space-x-3">
                  <UserWithAvatar
                    user={user}
                    isCurrent={user.id === currentUser.id}
                  />
                </div>
                <div className="col-span-4 text-right font-medium">
                  {user.score.toLocaleString()} XP
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
                  {enhancedCurrentUser.score.toLocaleString()} XP
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
  user: { avatar: string; username: string; badge?: string };
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
            alt={`${user.username}'s avatar`}
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
        {user.username}
        {isCurrent && ' (You)'}
      </span>
    </>
  );
}
