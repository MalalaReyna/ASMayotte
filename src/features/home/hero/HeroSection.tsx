"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Hero } from '@/components/hero/hero';
import { Button } from '@/components/ui/button';
import { HeroAccueil } from '@/components/hero/hero-accueil';
import Carrousel from './Carrousel';
import ChiffreCle from './chiffre-cle';
import Link from 'next/link';

const data = {
  title: "Transformez les marchés publics en opportunités de croissance.",
  subtitle: "A&S accompagne les entreprises de l'identification du marché jusqu'au dépôt définitif de leur offre : analyse, stratégie, mémoire technique et pièces administratives et financières.",
  tags: ["Analyse du DCE", "Mémoire technique", "Dépôt de l'offre"],
}

export function HeroSection() {
  return (
    <Hero className="min-h-screen">
      <HeroAccueil title={data.title} subtitle={data.subtitle} tags={data.tags}>
        <div className="flex flex-rows items-center justify-center gap-4 mt-4">
          <Link href={"/reponse-marche-public"}>
          <Button
            size="lg"
            className="hover:cursor-pointer bg-dark hover:bg-primary/90 text-primary-foreground rounded-full p-6"
          >
            Faire analyser mon marché
          </Button>
          </Link>
          <Link href={"/reponse-marche-public"}>
          <Button
            size="lg"
            className="hover:cursor-pointer bg-white hover:bg-primary/90 text-dark hover:text-white rounded-full p-6"
          >
            Voir les marchés disponibles
          </Button>
          </Link>
        </div>
      </HeroAccueil>
      <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{ duration: 0.25, delay: 0.1 }}
      >
        <Image
          width={480}
          height={880}
          src="/images/hero-illustration.png"
          alt="Illustration de la création d'entreprise"
          className="absolute -bottom-30 2xl:right-14 pointer-events-none hidden 2xl:block"
        />
      </motion.div>
      <Carrousel />
      <ChiffreCle />
    </Hero>
  );
}
