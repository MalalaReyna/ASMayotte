"use client";

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
};

export default function WizardInputField({
  label,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <label className="block">
      <span className="text-[#7A430D] font-medium">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
      />
    </label>
  );
}