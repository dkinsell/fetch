// This component displays an individual dog's information along with an action button.
import React from "react";
import { Dog } from "../types";

// DogCardProps defines the properties for the DogCard component.
interface DogCardProps {
  dog: Dog; // Dog object containing id, img, name, age, zip_code, and breed.
  buttonText: string;
  onAction: (dogId: string) => void;
}

// Functional component that renders dog details and an action button.
const DogCard = ({ dog, buttonText, onAction }: DogCardProps) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-out flex flex-col">
      <div className="p-5 flex-grow">
        <div className="w-full h-64 overflow-hidden rounded-xl relative bg-white border border-slate-200">
          {dog.img && (
            <img
              src={dog.img}
              alt={dog.name}
              className="block w-full h-full object-cover"
            />
          )}
        </div>
        <div className="pt-4">
          <h3 className="text-xl font-semibold text-slate-800 mb-1">
            {dog.name}
          </h3>
          <div className="flex flex-wrap gap-2 text-sm text-slate-600">
            <span className="bg-slate-100 px-2 py-1 rounded-md">
              {dog.breed}
            </span>
            <span className="bg-slate-100 px-2 py-1 rounded-md">
              Age: {dog.age}
            </span>
            <span className="bg-slate-100 px-2 py-1 rounded-md">
              ZIP: {dog.zip_code}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => onAction(dog.id)}
        className="w-full mt-auto py-3 bg-white border-t border-slate-100 text-rose-600 font-medium hover:bg-rose-50 transition-colors duration-200 rounded-b-xl"
      >
        {buttonText}
      </button>
    </div>
  );
};

// Export DogCard as a memoized component to optimize rendering performance.
export default React.memo(DogCard);
