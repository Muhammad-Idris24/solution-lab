export const AdminMiniChart = ({ values, label }: { values: number[]; label: string }) => {
  const max = Math.max(...values, 1);

  return (
    <div className="rounded-xl border border-slate-100 p-3">
      <p className="mb-2 text-sm font-semibold text-slate-600">{label}</p>
      <div className="flex h-24 items-end gap-2">
        {values.map((value, index) => {
          const height = Math.max(8, Math.round((value / max) * 96));
          return (
            <div
              key={`${label}-${index}`}
              className="w-8 rounded-t-md bg-gradient-to-t from-[#157b86] to-[#1fb6b6]"
              style={{ "--bar-height": `${height}px` } as React.CSSProperties}
              title={`${value}`}
            />
          );
        })}
      </div>
    </div>
  );
};
