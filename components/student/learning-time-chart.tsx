interface LearningPoint {
  week: string;
  hours: number;
}

export const LearningTimeChart = ({ data }: { data: LearningPoint[] }) => {
  const max = Math.max(...data.map((entry) => entry.hours), 1);

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="mb-3 text-sm font-semibold text-slate-600">Weekly learning time (hours)</p>
      <div className="flex items-end gap-3">
        {data.map((entry) => {
          const height = Math.round((entry.hours / max) * 120);
          return (
            <div key={entry.week} className="flex flex-1 flex-col items-center gap-2">
              <div className="text-xs font-semibold text-slate-500">{entry.hours}h</div>
              <div className="w-full max-w-10 rounded-t-md bg-[#1fb6b6]/20" style={{ height: 120 }}>
                <div
                  className="w-full rounded-t-md bg-[#1fb6b6]"
                  style={{ height, marginTop: 120 - height }}
                />
              </div>
              <div className="text-xs text-slate-500">{entry.week}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
