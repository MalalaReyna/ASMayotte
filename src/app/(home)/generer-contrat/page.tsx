import GenerateContractForm from "@/features/contracts/GenerateContractForm";

export default function GenererContratPage() {
  return (
    <main className="min-h-screen bg-[#FCFAF7] px-4 py-10 md:py-14">
      <section className="mt-10 max-w-5xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#7A430D]">
            Générer des contrats
          </h1>
          <p className="mt-2 text-[#8C7A6B]">
            Remplissez les informations, choisissez le type de contrat correspondant,
            puis générez le contrat de travail.
          </p>
        </div>

        <GenerateContractForm />
      </section>
    </main>
  );
}
