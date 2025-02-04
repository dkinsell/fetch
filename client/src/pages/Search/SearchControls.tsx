import Select from "react-select";
import { SearchControlsProps } from "../../types";

interface Option {
  value: string;
  label: string;
}

const SearchControls = ({
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
}: SearchControlsProps) => {
  // Convert allBreeds into options for react-select
  const options: Option[] = allBreeds.map((breed) => ({
    value: breed,
    label: breed,
  }));

  // Determine which options are selected
  const selectedOptions = options.filter((option) =>
    selectedBreeds.includes(option.value)
  );

  // Local reusable Card component to wrap sections with common styling
  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-4">{children}</div>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Options */}
      <Card>
        <h3 className="text-lg font-semibold mb-2">Filter Options</h3>
        <div className="flex flex-wrap gap-4 items-center">
          {/* Multi-Select for Breeds */}
          <div className="flex flex-col">
            <label htmlFor="breed-select" className="mb-1 font-medium">
              Breed
            </label>
            <div className="min-w-[200px]">
              <Select
                id="breed-select"
                isMulti
                options={options}
                value={selectedOptions}
                onChange={(selected) => {
                  const values = selected
                    ? selected.map((opt) => opt.value)
                    : [];
                  onBreedChange(values);
                }}
                placeholder="Select breed(s)..."
              />
            </div>
          </div>
          {/* Age Range */}
          <div className="flex flex-col">
            <label htmlFor="age-min" className="mb-1 font-medium">
              Min Age
            </label>
            <input
              id="age-min"
              type="number"
              value={ageMin !== undefined ? ageMin : ""}
              onChange={(e) => {
                const val = e.target.value;
                onAgeMinChange(val === "" ? undefined : Number(val));
              }}
              className="w-20 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="age-max" className="mb-1 font-medium">
              Max Age
            </label>
            <input
              id="age-max"
              type="number"
              value={ageMax !== undefined ? ageMax : ""}
              onChange={(e) => {
                const val = e.target.value;
                onAgeMaxChange(val === "" ? undefined : Number(val));
              }}
              className="w-20 p-2 border border-gray-300 rounded"
            />
          </div>
          {/* Zip Codes */}
          <div className="flex flex-col">
            <label htmlFor="zip-codes" className="mb-1 font-medium">
              ZIP Codes
            </label>
            <input
              id="zip-codes"
              type="text"
              value={zipCodes}
              onChange={(e) => onZipCodesChange(e.target.value)}
              placeholder="Separate with commas"
              className="w-40 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </Card>

      {/* Sorting Options */}
      <Card>
        <h3 className="text-lg font-semibold mb-2">Sorting Options</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-col">
            <label htmlFor="sort-field" className="mb-1 font-medium">
              Sort Field
            </label>
            <select
              id="sort-field"
              value={sortField}
              onChange={(e) =>
                onSortFieldChange(e.target.value as "breed" | "name" | "age")
              }
              className="w-40 p-2 border border-gray-300 rounded"
            >
              <option value="breed">Breed</option>
              <option value="name">Name</option>
              <option value="age">Age</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="sort-order" className="mb-1 font-medium">
              Sort Order
            </label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) =>
                onSortOrderChange(e.target.value as "asc" | "desc")
              }
              className="w-40 p-2 border border-gray-300 rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onSearch}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Search
        </button>
        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default SearchControls;
