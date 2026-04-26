import { useState, useEffect } from "react";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import TeamCard from "../components/TeamCard";
import SkeletonCard from "../components/SkeletonCard";
import SkeletonText from "../components/SkeletonText";
import { useNavigate } from "react-router-dom";
import { getStoredTeams, subscribeTeamsChange } from "../utils/team";
import { dummyTeams } from "../data/dummyTeams";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  
  useEffect(() => {
    setTeams(getStoredTeams());
    const unsubscribeTeams = subscribeTeamsChange(setTeams);

    const timer = setTimeout(() => setLoading(false), 1000);
    return () => {
      clearTimeout(timer);
      unsubscribeTeams();
    };
  }, []);

  return (
    <div>

      <Header />

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {loading ? (
          [1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <SkeletonText className="mb-2 h-6 w-16" />
              <SkeletonText className="mb-2 h-4 w-24" />
              <SkeletonText className="h-3 w-32" />
            </div>
          ))
        ) : (
          <>
            <StatsCard
              title="Tim Aktif"
              value={teams.length}
              subtitle="Bergabung dalam tim"
            />
            <StatsCard
              title="Lamaran"
              value="3"
              subtitle="Menunggu respon"
            />
            <StatsCard
              title="Undangan"
              value="5"
              subtitle="Belum dibaca"
            />
          </>
        )}
      </div>

      {/* Tim Aktif */}
      <div className="mb-6">
        <h2 className="mb-3 font-semibold text-gray-800 dark:text-gray-100">
          Tim Aktif Saya
        </h2>

        <div className="flex gap-4 flex-wrap">
          {loading ? (
            [1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-[280px] rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <SkeletonText className="mb-3 h-5 w-36" />
                <SkeletonText className="mb-3 h-6 w-20 rounded-full" />
                <SkeletonText className="h-4 w-24" />
              </div>
            ))
          ) : teams.length > 0 ? (
            teams.map((team) => (
              <TeamCard
                key={team.id}
                {...team}
                onClick={() => navigate(`/team/${team.id}`)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Kamu belum punya tim. Yuk cari atau buat tim baru 🚀
            </p>
          )}
        </div>
      </div>

      {/* Rekomendasi */}
      <div>
        <h2 className="mb-3 font-semibold text-gray-800 dark:text-gray-100">
          Rekomendasi Tim
        </h2>

        <div className="flex gap-4 flex-wrap">
          {loading
            ? [1, 2, 3].map((item) => (
                <SkeletonCard key={item} className="h-[136px] w-[280px]" />
              ))
            : dummyTeams.map((team) => (
                <TeamCard key={team.id} {...team} />
              ))}
        </div>
      </div>

    </div>
  );
}
