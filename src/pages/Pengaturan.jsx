import { useState } from "react";
import PageLayout from "../components/PageLayout";

function Pengaturan() {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked((prev) => !prev);
  };

  return (
    <PageLayout title="Pengaturan">
      <div className="flex items-center justify-between">
        <span className="text-black">Mode Gelap</span>

        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="h-5 w-5 cursor-pointer"
        />
      </div>
    </PageLayout>
  );
}

export default Pengaturan;
