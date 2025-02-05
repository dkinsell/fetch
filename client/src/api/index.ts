// API Abstraction file for Fetch Dogs
// Centralizes all API calls, base URL, and default fetch options for communicating with the backend.
const BASE_URL = "https://frontend-take-home-service.fetch.com";

// Default options for fetch requests
const defaultFetchOptions: RequestInit = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};

// Logs in a user by sending a POST request with the provided name and email
export const login = async (name: string, email: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    ...defaultFetchOptions,
    method: "POST",
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    throw new Error(`Login failed with status: ${response.status}`);
  }
};

// Logs out the current user by sending a POST request to the logout endpoint
export const logout = async (): Promise<void> => {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    ...defaultFetchOptions,
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Logout failed with status: ${response.status}`);
  }
};

// Fetches a list of dog breeds from the API
export const getBreeds = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/dogs/breeds`, {
    ...defaultFetchOptions,
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch breeds, status: ${response.status}`);
  }

  const breeds: string[] = await response.json();
  return breeds;
};

// Searches for dogs using the provided search parameters
// Returns paginated results including a list of dogs and the total count
export const searchDogs = async (params: {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}): Promise<{
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}> => {
  const url = new URL(`${BASE_URL}/dogs/search`);

  if (params.breeds && params.breeds.length > 0) {
    params.breeds.forEach((breed) => url.searchParams.append("breeds", breed));
  }
  if (params.zipCodes) {
    params.zipCodes.forEach((zip) => url.searchParams.append("zipCodes", zip));
  }
  if (typeof params.ageMin === "number") {
    url.searchParams.set("ageMin", String(params.ageMin));
  }
  if (typeof params.ageMax === "number") {
    url.searchParams.set("ageMax", String(params.ageMax));
  }
  if (params.size) {
    url.searchParams.set("size", String(params.size));
  }
  if (params.from) {
    url.searchParams.set("from", String(params.from));
  }
  if (params.sort) {
    url.searchParams.set("sort", params.sort);
  }

  const response = await fetch(url.toString(), {
    ...defaultFetchOptions,
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to search dogs, status: ${response.status}`);
  }

  return response.json();
};

// Fetches detailed dog data for the provided list of dog IDs.
export const fetchDogsByIds = async (
  dogIds: string[]
): Promise<
  {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  }[]
> => {
  const response = await fetch(`${BASE_URL}/dogs`, {
    ...defaultFetchOptions,
    method: "POST",
    body: JSON.stringify(dogIds),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dogs, status: ${response.status}`);
  }

  return response.json();
};

// Retrieves a match for the provided dog IDs
export const getMatch = async (dogIds: string[]): Promise<string> => {
  const response = await fetch(`${BASE_URL}/dogs/match`, {
    ...defaultFetchOptions,
    method: "POST",
    body: JSON.stringify(dogIds),
  });

  if (!response.ok) {
    throw new Error(`Failed to get match, status: ${response.status}`);
  }

  const data = (await response.json()) as { match: string };
  return data.match;
};
