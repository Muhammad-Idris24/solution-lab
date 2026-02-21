export const AnalyticsMiniChart = ({ values }: { values: number[] }) => {
  const max = Math.max(...values, 1);

  return (
    <div className="flex h-24 items-end gap-2">
      {values.map((value, index) => {
        const height = Math.max(8, Math.round((value / max) * 96));
        return (
          <div
            key={`${index}-${value}`}
            className="w-8 rounded-t-md bg-gradient-to-t from-[#157b86] to-[#1fb6b6]"
            style={{ height }}
            title={`${value}%`}
          />
        );
      })}
    </div>
  );
};
