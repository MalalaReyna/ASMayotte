'use client';

import { IExpert } from '@/interfaces/expert';
import { motion } from 'framer-motion';
import Image from 'next/image';
export function ExpertCard({expert}: {expert: IExpert}) {
  return (
    <motion.div
      className="text-center">
      <div
        className="mb-4 flex gap-5 justify-center">
        <div className='flex flex-col gap-1 items-center'>
          <Image
            src={expert.imageUrl}
            alt={expert.name}
            width={120}
            height={120}
            className="w-24 h-24 rounded-full object-cover"
            unoptimized
          />
          <div className="flex justify-center gap-3">
            {expert.socialMediaList?.map((social) => (
              <a
                key={social.id}
                href={social.smLink}
                aria-label={`${social.smName} de ${expert.name}`}
                className="w-8 h-8 rounded-full text-dark hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
              >
                <Image src={social.iconUrl} alt={social.smName} width={24} height={24} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-h4-mobile font-medium text-foreground mb-1 text-left">{expert.name}</h3>
          <p className="text-dark text-sm mb-3 text-left">{expert.occupation}</p>
        </div>
      </div>
    </motion.div>
  );
}
