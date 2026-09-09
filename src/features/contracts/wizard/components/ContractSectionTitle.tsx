type Props = { title: string };

export default function ContractSectionTitle({ title }: Props) {
  return (
    <h3 className="text-base font-semibold text-[#5A3200] border-b border-[#E6D8CC] pb-1">
      {title}
    </h3>
  );
}