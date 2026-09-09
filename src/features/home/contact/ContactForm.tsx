'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ContactUsFormData, contactUsFormSchema } from '@/validations/contactUs/contactUsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { mapContactUsFormDataToRequest, sendContactUsMail } from '@/services/contactUs/contactUsService';
import { useMutation } from '@tanstack/react-query';
import { ContactUsRequest } from '@/types/contactUs/contactUsType';
import { toast } from 'sonner';
const enterpriseTypes = [
  { value: 'Auto-entrepreneur', label: 'Auto-entrepreneur' },
  { value: 'Eurl', label: 'EURL' },
  { value: 'Sarl', label: 'SARL' },
  { value: 'Sas', label: 'SAS' },
  { value: 'Sasu', label: 'SASU' },
  { value: 'Sci', label: 'SCI' },
  { value: 'Micro-entreprise', label: 'Micro-entreprise' },
  { value: 'Holding', label: 'Holding' },
];

const locations = [
  { value: 'Mayotte', label: 'Mayotte' },
  { value: 'Reunion', label: 'La Réunion' },
  { value: 'Guyane', label: 'Guyane' },
  { value: 'Martinique', label: 'Martinique' },
  { value: 'Guadeloupe', label: 'Guadeloupe' },
  { value: 'France Metropolitaine', label: 'France Métropolitaine' },
];

export function ContactForm() {
  const mutation = useMutation({
    mutationFn: async (values: ContactUsRequest) => {
      return await sendContactUsMail(values);
    },
    onMutate: () => {
      toast.info("Envoi en cours...");
    },
    onSuccess: () => {
      toast.success("Mail envoyée avec succès !");
      reset(); // Réinitialise le formulaire après un envoi réussi

    },
    onError: (err) => {
      toast.error("Une erreur est survenue lors de l'envoi.");
    }
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactUsFormData>({
    resolver: zodResolver(contactUsFormSchema)
  });

  function onSubmit(data: ContactUsFormData) {
    const dataFormatted = mapContactUsFormDataToRequest(data);
    mutation.mutate(dataFormatted);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="prenom" className="block text-sm text-primary mb-2">
            Prénom <span className="text-primary">*</span>
          </label>
          <input
            {...register('prenom')}
            id="prenom"
            type="text"
            placeholder="Votre prénom"
            required
            className="bg-white w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.prenom ? (<p className='text-sm text-red-500'>{errors.prenom.message}</p>) : null}
        </div>
        <div>
          <label htmlFor="nom" className="block text-sm text-primary mb-2">
            Nom <span className="text-primary">*</span>
          </label>
          <input
            {...register('nom')}
            id="nom"
            type="text"
            placeholder="Votre nom"
            required
            className="bg-white w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.nom ? (<p className='text-sm text-red-500'>{errors.nom.message}</p>) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm text-primary mb-2">
            Email <span className="text-primary">*</span>
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            placeholder="votre.email@exemple.fr"
            required
            className="bg-white w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.email ? (<p className='text-sm text-red-500'>{errors.email.message}</p>) : null}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-primary mb-2">
            Téléphone <span className="text-primary">*</span>
          </label>
          <input
            {...register('phone')}
            id="phone"
            type="tel"
            placeholder="+262XXXXXXXXX"
            required
            className="bg-white w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.phone ? (<p className='text-sm text-red-500'>{errors.phone.message}</p>) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="block text-sm text-primary mb-2">
            Type d&apos;entreprise <span className="text-primary"></span>
          </label>
          <select
            {...register('type')}
            id="type"
            className="bg-white w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Sélectionnez un type</option>
            {enterpriseTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.type ? (<p className='text-sm text-red-500'>{errors.type.message}</p>) : null}
        </div>
        <div>
          <label htmlFor="location" className="block text-sm text-primary mb-2">
            Localisation <span className="text-primary"></span>
          </label>
          <select
            {...register('localisation')}
            id="location"
            className="bg-white w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Sélectionnez votre localisation</option>
            {locations.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
          {errors.localisation ? (<p className='text-sm text-red-500'>{errors.localisation.message}</p>) : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-primary mb-2">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          placeholder="Décrivez votre projet et vos besoins..."
          required
          className="bg-white w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {errors.message ? (<p className='text-sm text-red-500'>{errors.message.message}</p>) : null}
      </div>

      {/* <div className="flex items-center gap-3">
        <input
          {...register('acceptCondition')}
          type="checkbox"
          id="consent"
          className="w-4 h-4 accent-primary rounded"
        />
        <label htmlFor="consent" className="text-xs text-secondary">
          J&apos;accepte les conditions générales et la politique de confidentialité
        </label>
        {errors.acceptCondition ? (<p className='text-sm text-red-500'>{errors.acceptCondition.message}</p>) : null}
      </div> */}

      <motion.button
        type="submit"
        disabled={mutation.isPending}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-primary text-white py-3 rounded-4xl hover:bg-primary/90 disabled:opacity-50 transition-all"
      >
        {mutation.isPending ? 'Envoi en cours...' : 'Envoyer ma demande'}
      </motion.button>
    </motion.form>
  );
}
