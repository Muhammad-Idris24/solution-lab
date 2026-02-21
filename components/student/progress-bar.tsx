export const ProgressBar = ({ value }: { value: number }) => (
  <div className="h-2 w-full rounded-full bg-slate-100">
    <div
      className="h-2 rounded-full bg-gradient-to-r from-[#1fb6b6] to-[#157b86] transition-all"
      style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
    />
  </div>
);
