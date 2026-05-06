import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import StepIndicator from "../components/StepIndicator";
import Toast from "../components/ui/Toast";
import ClickSpark from "../components/ui/ClickSpark";
import { addStoredTeam } from "../utils/team";
import { useToast } from "../hooks/useToast";
import { dummyTeams } from "../data/dummyTeams";

function CreateTeam() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { toasts, showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    durationValue: "",
    durationUnit: "",
    level: "",
    memberCount: 1,
    skills: [],
    customSkill: "",
    location: "",
    deadline: "",
  });

  const availableSkills = Array.from(
    new Set(dummyTeams.flatMap((team) => team.roles))
  );

  const saveTeamToLocalStorage = () => {
    const newTeam = {
      id: Date.now(),
      teamName: form.name,
      category: form.category,
      description: form.description,
      duration: `${form.durationValue} ${form.durationUnit}`,
      level: form.level,
      memberCount: form.memberCount,
      skills: form.skills,
      location: form.location,
      deadline: form.deadline,
      maxMembers: 5,
    };

    addStoredTeam(newTeam);
  };

  const stepTitle = [
    "Informasi Dasar",
    "Kebutuhan Anggota",
    "Detail Tambahan",
    "Selesai",
  ][step - 1];

  return (
    <PageLayout title="Buat Tim Baru">
      <p className="text-sm text-gray-600 mb-6 max-w-2xl">
        Buat tim baru dan cari anggota yang tepat untuk proyekmu.
      </p>

      <StepIndicator step={step} />

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500">Langkah {step} dari 4</p>
            <h2 className="mt-2 text-2xl font-semibold text-black">{stepTitle}</h2>
          </div>

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nama Tim *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Proyek Aplikasi Edukasi"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Kategori *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:bg-white"
                >
                  <option value="">Pilih kategori</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Research">Research</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Deskripsi Tim
                </label>
                <textarea
                  placeholder="Jelaskan tentang tim dan tujuan yang ingin dicapai..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="h-40 w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Durasi Proyek
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      value={form.durationValue}
                      onChange={(e) => setForm({ ...form, durationValue: e.target.value })}
                      placeholder="Jumlah"
                      className="flex-1 rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                    <select
                      value={form.durationUnit}
                      onChange={(e) => setForm({ ...form, durationUnit: e.target.value })}
                      className="flex-1 rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:bg-white"
                    >
                      <option value="">Unit</option>
                      <option value="hari">Hari</option>
                      <option value="minggu">Minggu</option>
                      <option value="bulan">Bulan</option>
                      <option value="tahun">Tahun</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Level
                  </label>
                  <select
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                    className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:bg-white"
                  >
                    <option value="">Pilih level</option>
                    <option value="Pemula">Pemula</option>
                    <option value="Menengah">Menengah</option>
                    <option value="Lanjutan">Lanjutan</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 text-sm text-gray-700">
              <p className="text-base font-medium text-gray-900">Tentukan kebutuhan anggota</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Jumlah Anggota
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-slate-50 px-3 py-2">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          memberCount: Math.max(prev.memberCount - 1, 1),
                        }))
                      }
                      className="h-10 w-10 rounded-2xl bg-white text-lg font-semibold text-gray-700 shadow-sm"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold text-gray-900">
                      {form.memberCount} orang
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          memberCount: Math.min(prev.memberCount + 1, 20),
                        }))
                      }
                      className="h-10 w-10 rounded-2xl bg-white text-lg font-semibold text-gray-700 shadow-sm"
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Mulai dari 1 agar tidak perlu mengulang dari 0.
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Kebutuhan Keahlian
                  </label>
                  <div className="grid gap-2 rounded-2xl border border-gray-200 bg-white p-4">
                    {availableSkills.map((skill) => (
                      <label
                        key={skill}
                        className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700"
                      >
                        <input
                          type="checkbox"
                          checked={form.skills.includes(skill)}
                          onChange={() => {
                            const exists = form.skills.includes(skill);
                            setForm({
                              ...form,
                              skills: exists
                                ? form.skills.filter((item) => item !== skill)
                                : [...form.skills, skill],
                            });
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tambahkan kebutuhan lain
                </label>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <input
                    value={form.customSkill}
                    onChange={(e) => setForm({ ...form, customSkill: e.target.value })}
                    placeholder="Contoh: Project Manager, QA"
                    className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const cleaned = form.customSkill.trim();
                      if (!cleaned) return;
                      if (!form.skills.includes(cleaned)) {
                        setForm({
                          ...form,
                          skills: [...form.skills, cleaned],
                          customSkill: "",
                        });
                      }
                    }}
                    className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 text-sm text-gray-700">
              <p className="text-base font-medium text-gray-900">Detail tambahan (opsional)</p>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Lokasi Kerja
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Remote / Onsite"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Deadline Internal
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 31 Desember 2026"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-sm text-gray-700">
              <p className="text-base font-semibold text-gray-900">Tinjau kembali timmu</p>
              <div className="space-y-3 rounded-3xl border border-gray-200 bg-slate-50 p-4">
                <p><span className="font-medium">Nama Tim:</span> {form.name}</p>
                <p><span className="font-medium">Kategori:</span> {form.category}</p>
                {form.description && <p><span className="font-medium">Deskripsi:</span> {form.description}</p>}
                <p><span className="font-medium">Jumlah Anggota:</span> {form.memberCount} orang</p>
                {form.skills.length > 0 && (
                  <p><span className="font-medium">Kebutuhan:</span> {form.skills.join(", ")}</p>
                )}
                {form.durationValue && form.durationUnit && <p><span className="font-medium">Durasi:</span> {form.durationValue} {form.durationUnit}</p>}
                {form.level && <p><span className="font-medium">Level:</span> {form.level}</p>}
                {form.location && <p><span className="font-medium">Lokasi:</span> {form.location}</p>}
                {form.deadline && <p><span className="font-medium">Deadline:</span> {form.deadline}</p>}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="rounded-2xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400"
            >
              Batal
            </button>
            <ClickSpark sparkColor="#3b82f6" sparkSize={10} sparkRadius={14} sparkCount={6} duration={400}>
              <button
                onClick={() => {
                  if (step === 1) {
                    if (!form.name || !form.name.trim()) {
                      showToast("Nama tim harus diisi", "error");
                      return;
                    }
                    if (!form.category) {
                      showToast("Kategori harus dipilih", "error");
                      return;
                    }
                    if (!form.durationValue || !form.durationUnit) {
                      showToast("Durasi harus diisi lengkap", "error");
                      return;
                    }
                    if (parseInt(form.durationValue) <= 0) {
                      showToast("Durasi harus lebih dari 0", "error");
                      return;
                    }
                  }

                  if (step < 4) {
                    setStep(step + 1);
                    return;
                  }

                  saveTeamToLocalStorage();
                  navigate("/tim");
                }}
                className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {step === 4 ? "Selesai" : "Selanjutnya →"}
              </button>
            </ClickSpark>
          </div>
        </div>

        <aside className="rounded-3xl border border-gray-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-900">Tips membuat tim yang menarik</p>
          <ul className="mt-5 space-y-4 text-sm text-gray-600">
            <li className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="font-medium text-gray-800">Gunakan nama yang jelas dan deskriptif</p>
            </li>
            <li className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="font-medium text-gray-800">Jelaskan tujuan dan ekspektasi tim</p>
            </li>
            <li className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="font-medium text-gray-800">Sebutkan skill yang dibutuhkan</p>
            </li>
            <li className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="font-medium text-gray-800">Tentukan durasi yang realistis</p>
            </li>
          </ul>
        </aside>
      </div>

      {/* TOAST */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => {}} />}

    </PageLayout>
  );
}

export default CreateTeam;
