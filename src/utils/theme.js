const lightTheme = {
  pageBackground: "#EEEDED",
  textColor: "#000000",
  cardBackground: "#FFFFFF",
  borderColor: "#D1D5DB",
};

export function setTheme() {
  const root = document.documentElement;
  root.style.setProperty("--page-background", lightTheme.pageBackground);
  root.style.setProperty("--text-color", lightTheme.textColor);
  root.style.setProperty("--card-background", lightTheme.cardBackground);
  root.style.setProperty("--border-color", lightTheme.borderColor);
}

export function getTheme() {
  return lightTheme;
}
