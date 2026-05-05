import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import SkeletonCard from "../components/SkeletonCard";
import TeamCard from "../components/TeamCard";
import { dummyTeams } from "../data/dummyTeams";
import { addStoredTeam, isTeamJoined } from "../utils/team";

function CariTim() {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  const [showFilter, setShowFilter] = useState(false);
  const [showMorePopup, setShowMorePopup] = useState(false);
  const [toast, setToast] = useState(null);

  const [filters, setFilters] = useState({
    category: [],
    level: [],
    duration: [],
  });

  // LOAD DATA
  useEffect(() => {
    const timer = setTimeout(() => {
      setTeams(dummyTeams);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2400);
  };

  // JOIN TEAM
  const handleJoin = (team) => {
    if (isTeamJoined(team.id)) {
      showToast("Kamu sudah join tim ini");
      return;
    }

    const newTeam = {
      ...team,
      id: crypto.randomUUID(),
      originalId: team.id,
    };

    addStoredTeam(newTeam);
    setTeams((prev) => [...prev]);
    showToast("Berhasil join tim 🚀");
  };

  // FILTER LOGIC
  const filteredTeams = teams.filter((team) => {
    if (filters.category.length && !filters.category.includes(team.category))
      return false;
    if (filters.level.length && !filters.level.includes(team.level))
      return false;
    if (filters.duration.length && !filters.duration.includes(team.duration))
      return false;
    return true;
  });

  const categories = [...new Set(teams.map((t) => t.category))];
  const levels = [...new Set(teams.map((t) => t.level))];
  const durations = [...new Set(teams.map((t) => t.duration))];

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  const removeFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((v) => v !== value),
    }));
  };

  const activeFilters = [
    ...filters.category.map((c) => ({ type: "category", value: c })),
    ...filters.level.map((l) => ({ type: "level", value: l })),
    ...filters.duration.map((d) => ({ type: "duration", value: d })),
  ];

  return (
    <PageLayout title="Cari Tim">

      {/* SEARCH + FILTER BUTTON */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari tim..."
          className="flex-1 rounded-lg border px-3 py-2 text-sm"
        />

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Filter
        </button>
      </div>

      {/* 🔥 FILTER DROPDOWN (PUTIH SOLID) */}
      {showFilter && (
        <div className="relative mb-4">
          <div className="absolute right-0 z-10 mt-2 w-72 rounded-xl p-4 shadow-lg bg-white border border-gray-200  dark:border-gray-700">

            {/* CATEGORY */}
            <div className="mb-3">
              <h4 className="font-semibold mb-2">Kategori</h4>
              {categories.slice(0, 3).map((cat) => (
                <label key={cat} className="block text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.category.includes(cat)}
                    onChange={() => handleFilterChange("category", cat)}
                  />
                  {cat}
                </label>
              ))}

              {categories.length > 3 && (
                <button
                  onClick={() => setShowMorePopup(true)}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  Tampilkan lebih banyak...
                </button>
              )}
            </div>

            {/* LEVEL */}
            <div className="mb-3">
              <h4 className="font-semibold mb-2">Level</h4>
              {levels.map((lvl) => (
                <label key={lvl} className="block text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.level.includes(lvl)}
                    onChange={() => handleFilterChange("level", lvl)}
                  />
                  {lvl}
                </label>
              ))}
            </div>

            {/* DURATION */}
            <div>
              <h4 className="font-semibold mb-2">Durasi</h4>
              {durations.map((dur) => (
                <label key={dur} className="block text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.duration.includes(dur)}
                    onChange={() => handleFilterChange("duration", dur)}
                  />
                  {dur}
                </label>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* 🔥 POPUP FILTER LENGKAP (BLUR BACKGROUND + WHITE MODAL) */}
      {showMorePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/40 backdrop-blur-sm">

          <div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white ">

            {/* HEADER */}
            <div className="flex justify-between items-center p-6 pb-0">
              <div>
                <h3 className="text-lg font-semibold">Filter Lengkap</h3>
                <p className="text-sm text-gray-500">
                  Pilih kategori, level, dan durasi.
                </p>
              </div>

              <button
                onClick={() => setShowMorePopup(false)}
                className="text-lg"
              >
                ✕
              </button>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-3 gap-6 px-6 mt-4">

              {/* CATEGORY */}
              <div>
                <h4 className="font-semibold mb-2">Kategori</h4>
                {categories.map((cat) => (
                  <label key={cat} className="block text-sm mb-1">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.category.includes(cat)}
                      onChange={() => handleFilterChange("category", cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>

              {/* LEVEL */}
              <div>
                <h4 className="font-semibold mb-2">Level</h4>
                {levels.map((lvl) => (
                  <label key={lvl} className="block text-sm mb-1">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.level.includes(lvl)}
                      onChange={() => handleFilterChange("level", lvl)}
                    />
                    {lvl}
                  </label>
                ))}
              </div>

              {/* DURATION */}
              <div>
                <h4 className="font-semibold mb-2">Durasi</h4>
                {durations.map((dur) => (
                  <label key={dur} className="block text-sm mb-1">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.duration.includes(dur)}
                      onChange={() => handleFilterChange("duration", dur)}
                    />
                    {dur}
                  </label>
                ))}
              </div>

            </div>

            {/* FOOTER */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setShowMorePopup(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* POPUP TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl">
          {toast}
        </div>
      )}

      {/* ACTIVE FILTER TAG */}
      {activeFilters.length > 0 && (
        <div className="mb-4 flex gap-2 flex-wrap">
          {activeFilters.map(({ type, value }) => (
            <span
              key={`${type}-${value}`}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {value}
              <button
                onClick={() => removeFilter(type, value)}
                className="ml-2"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* LIST */}
      <div className="flex flex-wrap gap-4">
        {loading
          ? [1, 2, 3].map((i) => (
              <SkeletonCard key={i} className="h-34 w-70" />
            ))
          : filteredTeams.map((team) => {
              const joined = isTeamJoined(team.id);

              return (
                <TeamCard
                  key={team.id}
                  {...team}
                  action={
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoin(team);
                      }}
                      disabled={joined}
                      className={`px-3 py-1 text-sm rounded text-white ${
                        joined ? "bg-gray-400" : "bg-green-600"
                      }`}
                    >
                      {joined ? "Sudah Bergabung" : "Gabung"}
                    </button>
                  }
                />
              );
            })}
      </div>

    </PageLayout>
  );
}

export default CariTim;