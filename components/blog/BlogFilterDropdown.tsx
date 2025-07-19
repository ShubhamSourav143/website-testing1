'use client';
export default function BlogFilterDropdown({ sortBy, setSortBy }) {
  return (
    <select
      className="px-4 py-2 border rounded-xl ml-2 text-base"
      value={sortBy}
      onChange={e => setSortBy(e.target.value)}
    >
      <option value="Most Viewed">Most Viewed</option>
      <option value="Latest">Latest</option>
      <option value="Oldest">Oldest</option>
    </select>
  );
}

