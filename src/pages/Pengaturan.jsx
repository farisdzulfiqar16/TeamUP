import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { setTheme, getTheme } from "../utils/theme";
import SkeletonCard from "../components/SkeletonCard";

function Pengaturan() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(getTheme());
  }, []);

  const handleToggle = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    setTheme(newValue ? "dark" : "light");
  };

  return (
    <PageLayout title="Pengaturan">
      <div className="flex justify-between">
        <span>Mode Gelap</span>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={handleToggle}
        />
      </div>
    </PageLayout>
  );
}

export default Pengaturan;