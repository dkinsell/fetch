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
    <div style={{ marginTop: "1rem" }}>
      <p>Total results: {total}</p>
      <button onClick={onPrev} disabled={from === 0}>
        Prev
      </button>
      <button onClick={onNext} disabled={from + size >= total}>
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
