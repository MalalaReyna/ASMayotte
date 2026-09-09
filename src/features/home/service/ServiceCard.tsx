// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// interface ServiceCardProps {
//   image: string;
//   title: string;
//   description: string;
//   isShowAction?: boolean;
//   actionLink?: string;
//   actionText?: string;
//   learnMoreLink?: string;
// }
// export function ServiceCard({ image, title, description, isShowAction = false, actionLink, actionText, learnMoreLink }: ServiceCardProps) {
//   return (
//     <motion.li className="relative group w-100 h-[33.75rem] flex-shrink-0 rounded-3xl overflow-hidden">

//       {/* Background Image */}
//       <Image
//         src={image}
//         alt={title}
//         fill
//         className="object-cover transition-transform duration-500 group-hover:scale-110"
//       />

//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

//       {/* Content */}
//       <div className="absolute bottom-0 left-0 w-full px-6 pb-6 text-white">

//         {/* TITLE */}
//         <h3 className="text-h5">
//           {title}
//         </h3>

//         {/* Animated content */}
//         <div className="mt-3 overflow-hidden">
//           <div className="transition-all duration-500 md:max-h-0 opacity-100 md:opacity-0 group-hover:max-h-40 md:group-hover:opacity-100">

//             <p className="text-sm">
//               {description}
//             </p>

//             <div className="mt-4 flex justify-between">
//               {isShowAction ? (
//                 <Link href={actionLink || "#"} aria-label={`Action pour ${title}`}>
//                   <Button className="rounded-full hover:cursor-pointer bg-primary text-surface hover:text-white flex items-center justify-center">
//                     {actionText || "Action"}
//                   </Button>
//                 </Link>) : null}
//               <Link href={learnMoreLink || "#"} aria-label={`En savoir plus sur ${title}`}>
//                 <Button className="rounded-full hover:cursor-pointer bg-white text-primary hover:text-white flex items-center justify-center">
//                   En savoir plus
//                 </Button>
//               </Link>
//             </div>

//           </div>
//         </div>

//       </div>
//     </motion.li>
//   );
// }

interface ServiceCardProps {
    badge: string;
    title: string;
    description: string;
}

export default function ServiceCard({ badge, title, description }: ServiceCardProps) {
  return(
    <div className="rounded-4xl border border-outline p-6">
      <div className="flex items-center justify-center w-12 h-12 text-white rounded-full mb-4 bg-white border border-secondary">
        <span className="text-lg font-semibold">{badge}</span>
      </div>
      <h3 className="text-xl text-primary font-semibold mb-2">{title}</h3>
      <p className="text-secondary">{description}</p>
    </div>
  );
}