type PublicTenderMethodStepProps = {
  number: number;
  title: string;
};

export default function PublicTenderMethodStep({
  number,
  title,
}: PublicTenderMethodStepProps) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-outline bg-surface px-5 py-4 shadow-sm">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-primary">
        {number}
      </span>
      <p className="text-sm font-semibold text-dark">{title}</p>
    </div>
  );
}
