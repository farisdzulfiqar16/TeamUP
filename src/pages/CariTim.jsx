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
  const [filters, setFilters] = useState({
    category: [],
    level: [],
    duration: [],
  });

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
      id: crypto.randomUUID(),
      originalId: team.id,
    };

    addStoredTeam(newTeam);
    alert("Berhasil join tim 🚀");
  };

  // 🔥 FILTER LOGIC
  const filteredTeams = teams.filter((team) => {
    if (
      filters.category.length > 0 &&
      !filters.category.includes(team.category)
    )
      return false;
    if (filters.level.length > 0 && !filters.level.includes(team.level))
      return false;
    if (
      filters.duration.length > 0 &&
      !filters.duration.includes(team.duration)
    )
      return false;
    return true;
  });

  // 🔥 DATA FILTER
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

      {/* 🔥 FILTER DROPDOWN */}
      {showFilter && (
        <div className="relative mb-4">
          <div
            className={`absolute right-0 z-10 mt-2 w-72 rounded-lg p-4 shadow-lg border bg-white/95 text-gray-800 border-gray-200 dark:bg-gray-800/95 dark:text-gray-100 dark:border-gray-700 backdrop-blur-sm transition-all duration-200 ease-out ${showFilter ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
          >
            {/* CATEGORY */}
            <div className="mb-3">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
                Kategori
              </h4>
              {categories.slice(0, 3).map((cat) => (
                <label key={cat} className="block text-sm text-gray-700 dark:text-gray-200">
                  <input
                    type="checkbox"
                    checked={filters.category.includes(cat)}
                    onChange={() => handleFilterChange("category", cat)}
                    className="mr-2"
                  />
                  {cat}
                </label>
              ))}
              {categories.length > 3 && (
                <button
                  type="button"
                  onClick={() => setShowMorePopup(true)}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  Tampilkan lebih banyak...
                </button>
              )}
            </div>

            {/* LEVEL */}
            <div className="mb-3">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
                Level
              </h4>
              {levels.map((lvl) => (
                <label key={lvl} className="block text-sm text-gray-700 dark:text-gray-200">
                  <input
                    type="checkbox"
                    checked={filters.level.includes(lvl)}
                    onChange={() => handleFilterChange("level", lvl)}
                    className="mr-2"
                  />
                  {lvl}
                </label>
              ))}
            </div>

            {/* DURATION */}
            <div>
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
                Durasi
              </h4>
              {durations.map((dur) => (
                <label key={dur} className="block text-sm text-gray-700 dark:text-gray-200">
                  <input
                    type="checkbox"
                    checked={filters.duration.includes(dur)}
                    onChange={() => handleFilterChange("duration", dur)}
                    className="mr-2"
                  />
                  {dur}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔥 POPUP FILTER LENGKAP */}
      {showMorePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filter Lengkap</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pilih kategori, level, dan durasi yang tersedia.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowMorePopup(false)}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Kategori</h4>
                <div className="max-h-40 overflow-y-auto pr-2">
                  {categories.map((cat) => (
                    <label key={cat} className="mb-2 flex items-center text-sm text-gray-700 dark:text-gray-200">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(cat)}
                        onChange={() => handleFilterChange("category", cat)}
                        className="mr-2"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Level</h4>
                <div className="max-h-40 overflow-y-auto pr-2">
                  {levels.map((lvl) => (
                    <label key={lvl} className="mb-2 flex items-center text-sm text-gray-700 dark:text-gray-200">
                      <input
                        type="checkbox"
                        checked={filters.level.includes(lvl)}
                        onChange={() => handleFilterChange("level", lvl)}
                        className="mr-2"
                      />
                      {lvl}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Durasi</h4>
                <div className="max-h-40 overflow-y-auto pr-2">
                  {durations.map((dur) => (
                    <label key={dur} className="mb-2 flex items-center text-sm text-gray-700 dark:text-gray-200">
                      <input
                        type="checkbox"
                        checked={filters.duration.includes(dur)}
                        onChange={() => handleFilterChange("duration", dur)}
                        className="mr-2"
                      />
                      {dur}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowMorePopup(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 ACTIVE FILTER TAG */}
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
          ? [1, 2, 3].map((i) => <SkeletonCard key={i} className="h-34 w-70" />)
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
