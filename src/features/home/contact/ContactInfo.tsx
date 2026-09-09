'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { socialLinks } from '../footer/footerData';

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@asmayotte.com',
    href: 'mailto:contact@asmayotte.com',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '09 72 10 31 26',
    href: 'tel:+2620639951628',
  },
  {
    icon: MapPin,
    label: 'Localisation',
    value: 'tsoundzou 1, pont de kwalé, Mamoudzou 97600, Mayotte',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lun - Ven: 9h - 18h\nSamedi: 9h - 12h',
    href: '#',
  },
];

export function ContactInfo() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h3 className="text-xl font-medium text-primary mb-1">
          Informations de contact
        </h3>
      </div>

      {contactDetails.map((detail, index) => {
        const Icon = detail.icon;
        return (
          <motion.div
            key={detail.label}
            className="flex gap-4 group"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="flex-grow">
              <p className="text-sm text-secondary">{detail.label}</p>
              <p className="text-sm text-primary whitespace-pre-line">
                {detail.value}
              </p>
            </div>
          </motion.div>
        );
      })}

      <div className="pt-6 border-t border-gray-200 flex flex-col">
        <div className='mt-5'>
          <h4 className="text-h4-mobile md:text-h4 font-medium text-primary mb-4">Suivez-nous</h4>
          <div className="flex gap-3">
            {socialLinks.map(({ name, icon: Icon,href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                aria-label={`Suivre sur ${name}`}
                className="w-15 h-15 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
