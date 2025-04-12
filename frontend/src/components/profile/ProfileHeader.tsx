import { Trophy, Star, Edit } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  joinDate: string;
  achievementsUnlocked: number;
  exp: number;
}

export default function ProfileHeader({
  name,
  joinDate,
  achievementsUnlocked,
  exp,
}: ProfileHeaderProps) {
  return (
    <div className="rounded-xl overflow-hidden bg-card">
      <div className="h-24 bg-gradient-to-r from-[#243452] to-[#64B5E1] relative">
        <div className="absolute -bottom-12 left-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white"></div>
        </div>
      </div>

      <div className="pt-16 pb-6 px-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-dark-blue">{name}</h1>
            <p className="text-gray-500">Joined {joinDate}</p>
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
          <button className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
