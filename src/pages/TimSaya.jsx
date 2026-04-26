import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import EmptyState from "../components/EmptyState";
import TeamCard from "../components/TeamCard";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard";
import { getStoredTeams, subscribeTeamsChange } from "../utils/team";

function TimSaya() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams(getStoredTeams());
    const unsubscribeTeams = subscribeTeamsChange(setTeams);

    const timer = setTimeout(() => setLoading(false), 900);
    return () => {
      clearTimeout(timer);
      unsubscribeTeams();
    };
  }, []);

  return (
    <PageLayout
      title="Tim Saya"
      action={
        <button
          onClick={() => navigate("/create-team")}
          className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-500 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          + Buat Tim
        </button>
      }
    >
      {loading ? (
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3].map((item) => (
            <SkeletonCard key={item} className="h-[136px] w-[280px]" />
          ))}
        </div>
      ) : teams.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              {...team}
              onClick={() => navigate(`/team/${team.id}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Belum punya tim"
          desc="Buat tim baru atau gabung ke tim lain"
        />
      )}
    </PageLayout>
  );
}

export default TimSaya;
