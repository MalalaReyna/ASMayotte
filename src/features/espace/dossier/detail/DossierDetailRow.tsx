type DossierDetailRowProps = {
  label: string;
  value: string;
};

export default function DossierDetailRow({ label, value }: DossierDetailRowProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[#8B7F73]">{label}</span>
      <span className="text-[#2C2015]">{value}</span>
    </div>
  );
}
