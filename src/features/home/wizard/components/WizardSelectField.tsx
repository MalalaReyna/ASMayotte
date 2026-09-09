"use client";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
};

export default function WizardSelectField({
  label,
  value,
  onChange,
  placeholder,
  options,
}: Props) {
  return (
    <label className="block">
      <span className="text-[#7A430D] font-medium">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}