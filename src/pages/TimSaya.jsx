import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import EmptyState from "../components/EmptyState";
import TeamCard from "../components/TeamCard";
import Toast from "../components/ui/Toast";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard";
import { useToast } from "../hooks/useToast";
import {
  getStoredTeams,
  subscribeTeamsChange,
  removeStoredTeam,
} from "../utils/team";

function TimSaya() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState(getStoredTeams());
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [teamToLeave, setTeamToLeave] = useState(null);
  const { toasts, showToast } = useToast();

  useEffect(() => {
    const unsubscribeTeams = subscribeTeamsChange(setTeams);

    const timer = setTimeout(() => setLoading(false), 900);
    return () => {
      clearTimeout(timer);
      unsubscribeTeams();
    };
  }, []);

  const handleKeluar = (team) => {
    setTeamToLeave(team);
    setShowConfirmModal(true);
  };

  const confirmLeave = () => {
    if (teamToLeave) {
      removeStoredTeam(teamToLeave.id);
      showToast(`Berhasil keluar dari ${teamToLeave.teamName}`, "success");

      // Update global teams isJoined
      const storedAllTeams = sessionStorage.getItem("allTeams");
      if (storedAllTeams) {
        const allTeams = JSON.parse(storedAllTeams);
        const updatedAllTeams = allTeams.map((t) =>
          t.id === teamToLeave.originalId ? { ...t, isJoined: false } : t,
        );
        sessionStorage.setItem("allTeams", JSON.stringify(updatedAllTeams));
      }
    }
    setShowConfirmModal(false);
    setTeamToLeave(null);
  };

  const cancelLeave = () => {
    setShowConfirmModal(false);
    setTeamToLeave(null);
  };

  return (
    <>
      <PageLayout
        title="Tim Saya"
        action={
          <button
            onClick={() => navigate("/create-team")}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
          >
            + Buat Tim
          </button>
        }
      >
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <SkeletonCard key={item} className="h-80 w-full" />
            ))}
          </div>
        ) : teams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                {...team}
                onClick={() => navigate(`/team/${team.id}`)}
                action={
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleKeluar(team);
                    }}
                    className="px-3 py-1 text-sm rounded text-white bg-red-600 hover:bg-red-500"
                  >
                    Keluar
                  </button>
                }
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

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Keluar dari Tim
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Yakin ingin keluar dari tim "{teamToLeave?.teamName}"?
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelLeave}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                Batal
              </button>

              <button
                onClick={confirmLeave}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      <Toast toasts={toasts} onClose={() => {}} />
    </>
  );
}

export default TimSaya;
