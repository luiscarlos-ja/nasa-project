const API_URL = "http://localhost:8000";
// Load planets and return as JSON.
async function httpGetPlanets() {
  try {
    const response = await fetch(`${API_URL}/planets`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching planets", error);
  }
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  // TODO: Once API is ready.
  try {
    const response = await fetch(`${API_URL}/launches`);
    return (await response.json()).sort(
      (a, b) => a.flightNumber - b.flightNumber
    );
  } catch (error) {
    console.error("Error fetching launches", error);
  }
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
