import { FC } from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SearchControlsProps {
  allBreeds: string[];
  selectedBreeds: string[];
  onBreedChange: (breeds: string[]) => void;
  sortField: "breed" | "name" | "age";
  onSortFieldChange: (field: "breed" | "name" | "age") => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
  onSearch: () => void;
  onResetFilters: () => void;
  ageMin?: number;
  ageMax?: number;
  onAgeMinChange: (value: number | undefined) => void;
  onAgeMaxChange: (value: number | undefined) => void;
  zipCodes: string;
  onZipCodesChange: (value: string) => void;
}

const SearchControls: FC<SearchControlsProps> = ({
  allBreeds,
  selectedBreeds,
  onBreedChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange,
  onSearch,
  onResetFilters,
  ageMin,
  ageMax,
  onAgeMinChange,
  onAgeMaxChange,
  zipCodes,
  onZipCodesChange,
}) => {
  // Convert the list of breeds into react-select options
  const options: Option[] = allBreeds.map((breed) => ({
    value: breed,
    label: breed,
  }));

  // Determine which options are currently selected
  const selectedOptions = options.filter((option) =>
    selectedBreeds.includes(option.value)
  );

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      {/* Multi-Select for Breeds */}
      <div>
        <label htmlFor="breed-select" style={{ marginRight: "0.5rem" }}>
          Breed:
        </label>
        <div style={{ minWidth: "200px" }}>
          <Select
            id="breed-select"
            isMulti
            options={options}
            value={selectedOptions}
            onChange={(selected) => {
              const values = selected ? selected.map((opt) => opt.value) : [];
              onBreedChange(values);
            }}
            placeholder="Select breed(s)..."
          />
        </div>
      </div>

      {/* Age Range Filtering */}
      <div>
        <label htmlFor="age-min" style={{ marginRight: "0.5rem" }}>
          Min Age:
        </label>
        <input
          id="age-min"
          type="number"
          value={ageMin !== undefined ? ageMin : ""}
          onChange={(e) => {
            const val = e.target.value;
            onAgeMinChange(val === "" ? undefined : Number(val));
          }}
          style={{ width: "80px" }}
        />
      </div>
      <div>
        <label htmlFor="age-max" style={{ marginRight: "0.5rem" }}>
          Max Age:
        </label>
        <input
          id="age-max"
          type="number"
          value={ageMax !== undefined ? ageMax : ""}
          onChange={(e) => {
            const val = e.target.value;
            onAgeMaxChange(val === "" ? undefined : Number(val));
          }}
          style={{ width: "80px" }}
        />
      </div>

      {/* Location Filtering by ZIP Codes */}
      <div>
        <label htmlFor="zip-codes" style={{ marginRight: "0.5rem" }}>
          ZIP Codes:
        </label>
        <input
          id="zip-codes"
          type="text"
          value={zipCodes}
          onChange={(e) => onZipCodesChange(e.target.value)}
          placeholder="Enter ZIP codes, comma-separated"
          style={{ width: "200px" }}
        />
      </div>

      {/* Advanced Sorting Controls */}
      <div>
        <label htmlFor="sort-field-select" style={{ marginRight: "0.5rem" }}>
          Sort Field:
        </label>
        <select
          id="sort-field-select"
          value={sortField}
          onChange={(e) =>
            onSortFieldChange(e.target.value as "breed" | "name" | "age")
          }
          style={{ marginRight: "1rem" }}
        >
          <option value="breed">Breed</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
      </div>
      <div>
        <label htmlFor="sort-order-select" style={{ marginRight: "0.5rem" }}>
          Sort Order:
        </label>
        <select
          id="sort-order-select"
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as "asc" | "desc")}
          style={{ marginRight: "1rem" }}
        >
          <option value="asc">Ascending (A → Z / Low → High)</option>
          <option value="desc">Descending (Z → A / High → Low)</option>
        </select>
      </div>

      {/* Search and Reset Buttons */}
      <button onClick={onSearch}>Search</button>
      <button onClick={onResetFilters} style={{ backgroundColor: "#eee" }}>
        Reset Filters
      </button>
    </div>
  );
};

export default SearchControls;
