export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface PaginationControlsProps {
  from: number;
  size: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export interface SearchControlsProps {
  allBreeds: string[];
  selectedBreeds: string[];
  onBreedChange: (breeds: string[]) => void;
  sortField: "breed" | "name" | "age";
  onSortFieldChange: (field: "breed" | "name" | "age") => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
  onResetFilters: () => void;
  ageMin?: number;
  ageMax?: number;
  onAgeMinChange: (value: number | undefined) => void;
  onAgeMaxChange: (value: number | undefined) => void;
  zipCodes: string;
  onZipCodesChange: (value: string) => void;
}
