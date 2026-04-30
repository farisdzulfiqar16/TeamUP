export function setTheme(mode) {
  const isDark = mode === "dark";
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("theme", mode);
}

export function getTheme() {
  return localStorage.getItem("theme") || "light";
}
