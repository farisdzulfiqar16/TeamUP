const TEAMS_KEY = "teams";
const TEAMS_UPDATED_EVENT = "teams:updated";

export function getStoredTeams() {
  return JSON.parse(localStorage.getItem(TEAMS_KEY) || "[]");
}

export function saveStoredTeams(teams) {
  localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
  window.dispatchEvent(new Event(TEAMS_UPDATED_EVENT));
}

export function addStoredTeam(team) {
  const currentTeams = getStoredTeams();
  saveStoredTeams([...currentTeams, team]);
}

export function subscribeTeamsChange(callback) {
  const handleCustomUpdate = () => callback(getStoredTeams());
  const handleStorageUpdate = (event) => {
    if (event.key === TEAMS_KEY) callback(getStoredTeams());
  };

  window.addEventListener(TEAMS_UPDATED_EVENT, handleCustomUpdate);
  window.addEventListener("storage", handleStorageUpdate);

  return () => {
    window.removeEventListener(TEAMS_UPDATED_EVENT, handleCustomUpdate);
    window.removeEventListener("storage", handleStorageUpdate);
  };
}

export function isTeamJoined(teamId) {
  const teams = getStoredTeams();
  return teams.some((t) => t.originalId === teamId);
}