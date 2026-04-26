export function setTheme(mode) {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }
  
  export function getTheme() {
    return localStorage.getItem("theme") === "dark";
  }