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
    <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
      <button
        onClick={onPrev}
        disabled={from === 0}
        className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition"
      >
        Prev
      </button>
      <span className="text-gray-700">
        Showing {from + 1} to {Math.min(total, from + size)} of {total}
      </span>
      <button
        onClick={onNext}
        disabled={from + size >= total}
        className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
