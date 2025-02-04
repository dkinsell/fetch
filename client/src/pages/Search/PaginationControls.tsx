import { FC } from "react";

interface PaginationControlsProps {
  from: number;
  size: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  from,
  size,
  total,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrev}
        disabled={from === 0}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
      >
        Prev
      </button>
      <span className="text-gray-700">
        Showing {from + 1} to {Math.min(total, from + size)} of {total}
      </span>
      <button
        onClick={onNext}
        disabled={from + size >= total}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
