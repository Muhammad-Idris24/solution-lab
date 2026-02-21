export const LoadingSpinner = ({ label = 'Loading...' }: { label?: string }) => (
  <div className="flex items-center justify-center gap-3 py-12 text-slate-600">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1fb6b6] border-t-transparent" />
    <span className="text-sm font-semibold">{label}</span>
  </div>
);
