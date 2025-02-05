import { PaginationControlsProps } from "../../types";

// Component that displays pagination controls for the search results
const PaginationControls = ({
  from,
  size,
  total,
  onPrev,
  onNext,
}: PaginationControlsProps) => {
  const buttonClass =
    "px-4 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition";

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
      {/* Previous button */}
      <button onClick={onPrev} disabled={from === 0} className={buttonClass}>
        Prev
      </button>
      {/* Display the current page range */}
      <span className="text-gray-700">
        Showing {from + 1} to {Math.min(total, from + size)} of {total}
      </span>
      {/* Next button */}
      <button
        onClick={onNext}
        disabled={from + size >= total}
        className={buttonClass}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
