import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import SkeletonCard from "../components/SkeletonCard";
import TeamCard from "../components/TeamCard";
import { dummyTeams } from "../data/dummyTeams";
import { addStoredTeam, isTeamJoined } from "../utils/team";

function CariTim() {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTeams(dummyTeams);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleJoin = (team) => {
    if (isTeamJoined(team.id)) {
      alert("Kamu sudah join tim ini");
      return;
    }

    const newTeam = {
      ...team,
      id: Date.now(), // id baru untuk user
      originalId: team.id, // simpan referensi
    };

    addStoredTeam(newTeam);
    alert("Berhasil join tim 🚀");
  };

  return (
    <PageLayout title="Cari Tim">

      <input
        type="text"
        placeholder="Cari tim..."
        className="mb-4 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      />

      <div className="flex flex-wrap gap-4">

        {loading ? (
          [1, 2, 3].map((item) => (
            <SkeletonCard key={item} className="h-[136px] w-[280px]" />
          ))
        ) : (
          teams.map((team) => {
            const joined = isTeamJoined(team.id);

            return (
              <TeamCard
                key={team.id}
                {...team}
                action={
                  <button
                    onClick={() => handleJoin(team)}
                    disabled={joined}
                    className={`px-3 py-1 text-sm rounded text-white ${
                      joined
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-500"
                    }`}
                  >
                    {joined ? "Sudah Join" : "Join"}
                  </button>
                }
              />
            );
          })
        )}

      </div>

    </PageLayout>
  );
}

export default CariTim;