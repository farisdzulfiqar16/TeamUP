import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { setTheme, getTheme } from "../utils/theme";

function Pengaturan() {
  const [isDark, setIsDark] = useState(getTheme() === "dark");

  const handleToggle = () => {
    const newMode = isDark ? "light" : "dark";
    setTheme(newMode);
    setIsDark(!isDark);
  };

  return (
    <PageLayout title="Pengaturan">
      <div className="flex items-center justify-between">
        <span className="text-gray-800 dark:text-gray-100">Mode Gelap</span>

        <input
          type="checkbox"
          checked={isDark}
          onChange={handleToggle}
          className="h-5 w-5 cursor-pointer"
        />
      </div>
    </PageLayout>
  );
}

export default Pengaturan;
