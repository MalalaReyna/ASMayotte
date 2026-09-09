// "use client";
// import { motion } from "framer-motion";
// import { useRef } from "react";
// import { ServiceCard } from "./ServiceCard";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { services } from "./serviceData";

// export default function ServiceSection() {
//   const carouselRef = useRef<HTMLUListElement>(null);

//   const scrollCarousel = (direction: "left" | "right") => {
//     if (!carouselRef.current) return;
//     const scrollAmount = direction === "left" ? -300 : 300;
//     carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//   };

//   return (
//     <article className="mt-15 bg-surface" id="services">
//       {/* On définit un gutter global à la section */}
//       <section
//         className="
//           py-10 flex flex-col gap-y-7
//           [--gutter:theme(spacing.6)]
//           lg:[--gutter:theme(spacing.8)]
//         "
//       >
//         {/* HEADER: container + gutter */}
//         <div
//           className="
//             mx-auto w-full max-w-6xl
//             px-[var(--gutter)]
//           "
//         >
//           <span className="text-secondary">Nos services</span>
//           <h2 className="text-4xl md:text-5xl font-semibold max-w-2xl">
//             Services de création et gestion d&apos;entreprise
//           </h2>
//           <p className="mt-5 text-secondary text-h5-mobile md:text-h5 max-w-xl">
//             Une gamme complète de services pour accompagner votre entreprise à
//             chaque étape de son développement, de la création à la gestion
//             quotidienne
//           </p>
//         </div>

//         {/* CAROUSEL: full width MAIS aligné au header via gutter */}
//         <div className="relative w-full">
//           <motion.ul
//             ref={carouselRef}
//             className="
//               flex gap-6 overflow-x-auto scrollbar-hide
//               py-5 pr-10
//               pl-[var(--gutter)]
//               lg:pl-[calc((100vw-theme(maxWidth.6xl))/2+var(--gutter))]
//             "
//           >
//             {services.map((service, index) => (
//               <ServiceCard
//                 key={index}
//                 image={service.image}
//                 title={service.title}
//                 description={service.description}
//                 isShowAction={!!service.actionLink}
//                 actionLink={service.actionLink}
//                 actionText={service.actionText}
//                 learnMoreLink={service.learnMoreLink}
//               />
//             ))}
//           </motion.ul>

//           <div className="mt-5 flex items-center gap-2 justify-end pr-10 max-w-6xl mx-auto">
//             <Button
//               onClick={() => scrollCarousel("left")}
//               className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
//             >
//               <ArrowLeft />
//             </Button>
//             <Button
//               onClick={() => scrollCarousel("right")}
//               className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
//             >
//               <ArrowRight />
//             </Button>
//           </div>
//         </div>
//       </section>
//     </article>
//   );
// }

import ServiceCard from "./ServiceCard";
import { services } from "./serviceData";

export default function ServiceSection() {
  return (
    <article className="mt-15 bg-surface min-h-screen" id="services">
      <section
        className="
          py-10 flex flex-col gap-y-7
          [--gutter:theme(spacing.6)]
          lg:[--gutter:theme(spacing.8)]
        "
      >
        <div
          className="
            mx-auto w-full max-w-6xl
            px-[var(--gutter)]
          "
        >
          <span className="text-secondary">Nos services</span>
          <h2 className="text-4xl md:text-5xl font-semibold max-w-2xl">
            Un cabinet pour structurer et développer votre entreprise.
          </h2>
          <p className="mt-5 text-secondary text-h5-mobile md:text-h5 max-w-xl">
            Marchés publics, formalités juridiques et gestion administrative : nos 
            experts vous accompagnent à chaque étape.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 px-[var(--gutter)] lg:px-[calc((100vw-theme(maxWidth.6xl))/2+var(--gutter))]">
          <div className="row-span-3 flex items-center justify-center p-6 rounded-4xl border border-outline ">
            <img
              src="/path/to/service-image.jpg"
              alt="Service Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              badge={service.badge}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>
    </article>
  );
}