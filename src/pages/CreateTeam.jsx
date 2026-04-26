import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import StepIndicator from "../components/StepIndicator";
import { addStoredTeam } from "../utils/team";

function CreateTeam() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const saveTeamToLocalStorage = () => {
    const newTeam = {
      id: Date.now(),
      teamName: form.name,
      category: form.category,
      description: form.description,
      memberCount: 1,
      maxMembers: 5,
    };

    addStoredTeam(newTeam);
  };

  return (
    <PageLayout title="Buat Tim">

      {/* Step Indicator */}
      <StepIndicator step={step} />

      {/* Title per step */}
      <h2 className="text-md mb-4 font-semibold text-gray-700 dark:text-gray-100">
        {step === 1 && "Informasi Tim"}
        {step === 2 && "Deskripsi"}
        {step === 3 && "Review"}
      </h2>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="flex flex-col gap-4">

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Nama Tim</label>
            <input
              type="text"
              placeholder="Masukkan nama tim"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="mt-1 w-full rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Kategori</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="mt-1 w-full rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">Pilih kategori</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Research">Research</option>
            </select>
          </div>

        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Deskripsi Tim</label>
          <textarea
            placeholder="Jelaskan tujuan tim..."
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="mt-1 h-32 w-full rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-100">
          <p><b>Nama Tim:</b> {form.name}</p>
          <p><b>Kategori:</b> {form.category}</p>
          <p><b>Deskripsi:</b> {form.description}</p>
        </div>
      )}

      {/* BUTTON NAVIGATION */}
      <div className="flex justify-between mt-6">

        {/* Back */}
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          className={`px-4 py-2 border rounded ${
            step === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Back
        </button>

        {/* Next / Submit */}
        <button
          onClick={() => {
            if (step === 1 && (!form.name || !form.category)) {
              alert("Isi nama dan kategori dulu");
              return;
            }

            if (step === 2 && !form.description) {
              alert("Isi deskripsi dulu");
              return;
            }

            if (step === 3) {
              saveTeamToLocalStorage();
              alert("Tim berhasil dibuat 🚀");
              navigate("/tim");
              return;
            }

            setStep(step + 1);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {step === 3 ? "Submit" : "Next"}
        </button>

      </div>

    </PageLayout>
  );
}

export default CreateTeam;
