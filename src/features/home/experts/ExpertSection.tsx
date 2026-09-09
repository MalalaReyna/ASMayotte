
import { IExpert } from '@/interfaces/expert';
import { ExpertsCarousel } from './ExpertsCarousel';
import { ExpertsHeader } from './ExpertsHeader';

export function ExpertsSection({experts}:{experts : IExpert[]}) {
  return (
    <article
      className="pb-25 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      aria-labelledby="experts-heading"
    >
      <div id="experts-heading" className="sr-only">
        Notre équipe d\&apos;experts
      </div>
      <ExpertsHeader />
      <ExpertsCarousel experts={experts}/>
    </article>
  );
}
