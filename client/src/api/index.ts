const BASE_URL = "https://frontend-take-home-service.fetch.com";

const defaultFetchOptions: RequestInit = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};

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

export const logout = async (): Promise<void> => {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    ...defaultFetchOptions,
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Logout failed with status: ${response.status}`);
  }
};

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
