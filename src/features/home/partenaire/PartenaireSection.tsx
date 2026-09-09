export default function PartenaireSection() {
  return (
    <article className="mt-15 bg-surface min-h-screen" id="services">
      <section
        className="
          py-10 flex flex-col gap-y-7
          [--gutter:theme(spacing.6)]
          lg:[--gutter:theme(spacing.8)]
        "
      >
        {/* HEADER */}
        <div
          className="
            mx-auto w-full max-w-6xl
            px-[var(--gutter)]
          "
        >
          <span className="text-secondary">Nos partenaires</span>

          <h2 className="text-4xl md:text-5xl font-semibold max-w-2xl">
            Ils nous font confiance
          </h2>

          <p className="mt-5 text-secondary text-h5-mobile md:text-h5 max-w-xl">
            Marchés publics, formalités juridiques et gestion administrative :
            nos experts vous accompagnent à chaque étape.
          </p>
        </div>

        {/* PARTENAIRES */}
        <div
          className="
            grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4
            gap-3 mt-8
            max-w-6xl w-full mx-auto
            px-[var(--gutter)]
          "
        >
          <div className="flex items-center justify-center bg-white rounded-4xl p-4 border border-outline shadow-xs">
            <img
              src="/images/partenaires/7fd97463f75fbd726393424a1f17f5ee0fdb2695.png"
              alt="Partenaire 1"
              className="max-h-25 object-contain"
            />
          </div>

          <div className="flex items-center justify-center bg-white rounded-4xl p-4 border border-outline shadow-xs">
            <img
              src="/images/partenaires/e311ee45cb13c831ecc8ee1119256374f917bcb2.png"
              alt="Partenaire 2"
              className="max-h-30 object-contain"
            />
          </div>

          <div className="flex items-center justify-center bg-white rounded-4xl p-4 border border-outline shadow-xs">
            <img
              src="/images/partenaires/36cad9d3a3c49aa6acea7cc0e8a9d13b6770a121.png"
              alt="Partenaire 3"
              className="max-h-30 object-contain"
            />
          </div>

          <div className="row-span-2 flex items-center bg-[#1E4A0B] rounded-4xl p-4 border border-outline shadow-xs">
            <img
              src="/images/partenaires/a73f717e0557d7371830177134d47fb4847b18b7.jpg"
              alt="Partenaire 4"
              className="min-h-50 object-contain"
            />
          </div>

          <div className="flex items-center justify-center bg-white rounded-4xl p-4 border border-outline shadow-xs">
            <img
              src="/images/partenaires/c859969ed3d3b876de41830c3c569ab48dbf4358.png"
              alt="Partenaire 5"
              className="max-h-30 object-contain"
            />
          </div>

          <div className="flex items-center justify-center bg-white rounded-4xl p-4 border border-outline shadow-xs">
            <img
              src="/images/partenaires/21fb604c03af1335721caab95d89050754bebd7a.png"
              alt="Partenaire 6"
              className="max-h-20 object-contain"
            />
          </div>

          <div className="flex items-center justify-center bg-white rounded-4xl pt-1 border border-outline shadow-xs">
            <img
              src="/images/partenaires/9809559b67166d97a0a22024ba08adf4014d2fdb.png"
              alt="Partenaire 7"
              className="max-h-27 object-contain"
            />
          </div>
        </div>
      </section>
    </article>
  );
}