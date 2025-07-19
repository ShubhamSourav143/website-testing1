'use client';

const chips = [
  "Rescue Story", "Permanent Care", "Medical Care", "Emergency Rescue",
  "Feeding Program", "Volunteer Work", "Recovery Story", "Campus Life",
  "Vaccination", "Success Story", "Behind the Scenes", "Inspiration"
];

interface TrendingChipsProps {
  activeTag: string;
  setActiveTag: (tag: string) => void;
}

export default function TrendingChips({ activeTag, setActiveTag }: TrendingChipsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            activeTag === '' 
              ? "bg-blue-600 text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTag('')}
        >
          All Stories
        </button>
        {chips.map(tag => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              activeTag === tag 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
