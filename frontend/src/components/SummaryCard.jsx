function SummaryCard({ title, value }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-sm p-6 hover:border-gray-700 transition">
      <p className="text-sm font-medium text-gray-400">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-white mt-2">
        {value}
      </h3>
    </div>
  );
}

export default SummaryCard;