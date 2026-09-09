import { Shield } from 'lucide-react';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowTimeline } from './WorkflowTimeline';

export default function WorkflowSection() {
  return (
    <article className="py-10 px-6 lg:px-8 max-w-6xl mx-auto">
      <WorkflowHeader />
      <WorkflowTimeline />
      <div className="mt-15 flex items-center justify-center">
        <div className="border border-outline rounded-full px-4 py-2 flex items-center gap-2">
          <Shield className='text-xs text-secondary size-4'/>
          <p className="text-secondary">
            Processus 100% sécurisé <span className='hidden md:inline'> et conforme aux normes françaises</span>
          </p>
        </div>
      </div>
    </article>
  );
}
