import { FC } from "react";

interface SearchControlsProps {
  allBreeds: string[];
  selectedBreed: string;
  onBreedChange: (b: string) => void;

  sortOrder: "asc" | "desc";
  onSortChange: (order: "asc" | "desc") => void;

  onSearch: () => void;
}

const SearchControls: FC<SearchControlsProps> = ({
  allBreeds,
  selectedBreed,
  onBreedChange,
  sortOrder,
  onSortChange,
  onSearch,
}) => {
  return (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      {/* Breed Filter */}
      <label htmlFor="breed-select">Breed:</label>
      <select
        id="breed-select"
        value={selectedBreed}
        onChange={(e) => onBreedChange(e.target.value)}
      >
        <option value="">All Breeds</option>
        {allBreeds.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      {/* Sort Order */}
      <label htmlFor="sort-select">Sort by Breed:</label>
      <select
        id="sort-select"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
      >
        <option value="asc">Ascending (A → Z)</option>
        <option value="desc">Descending (Z → A)</option>
      </select>

      {/* Search Button */}
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchControls;
