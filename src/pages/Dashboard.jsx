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
  const [teams, setTeams] = useState(getStoredTeams());

  useEffect(() => {
    const unsubscribe = subscribeTeamsChange(setTeams);

    const timer = setTimeout(() => setLoading(false), 1000);
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 p-4">

      <Header />

      {/* ================= STATS ================= */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border bg-white p-4 "
            >
              <SkeletonText className="mb-2 h-6 w-16" />
              <SkeletonText className="mb-2 h-4 w-24" />
              <SkeletonText className="h-3 w-32" />
            </div>
          ))
        ) : (
          <>
            <StatsCard title="Tim Aktif" value={teams.length} subtitle="Bergabung dalam tim" />
            <StatsCard title="Lamaran" value="3" subtitle="Menunggu respon" />
            <StatsCard title="Undangan" value="5" subtitle="Belum dibaca" />
          </>
        )}
      </div>

      {/* ================= TIM AKTIF ================= */}
      <div className="mb-6">
        <h2 className="mb-2 font-semibold text-gray-800 dark:text-gray-100">
          Tim Aktif Saya
        </h2>

        {teams.length === 0 && !loading && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Kamu belum punya tim
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? [1, 2, 3].map((i) => (
                <SkeletonCard key={i} className="h-80 w-full" />
              ))
            : teams.map((team) => (
                <TeamCard
                  key={team.id}
                  {...team}
                  onClick={() => navigate(`/team/${team.id}`)}
                />
              ))}
        </div>
      </div>

      {/* ================= REKOMENDASI ================= */}
      <div>
        <h2 className="mb-2 font-semibold text-gray-800 dark:text-gray-100">
          Rekomendasi Tim
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} className="h-80 w-full" />
              ))
            : dummyTeams.map((team) => (
                <TeamCard key={team.id} {...team} />
              ))}
        </div>
      </div>
    </div>
  );
}