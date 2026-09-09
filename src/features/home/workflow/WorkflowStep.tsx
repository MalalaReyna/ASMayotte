import { StepContent } from "./step/StepContent";
import { StepImage } from "./step/StepImage";
import StepIndicator from "./step/StepIndicator";

interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
  iconBadge: string;
  duration: string;
  imagePosition?: 'left' | 'right';
  image: React.ReactNode;
}

export function WorkflowStep({
  number,
  title,
  description,
  iconBadge,
  duration,
  imagePosition = 'right',
  image
}: WorkflowStepProps) {
  const contentElement = (
    <StepContent number={number} title={title} description={description} iconBadge={iconBadge} duration={duration} />
  );

  return (
    <li className="grid grid-cols-1 md:grid-cols-12 items-center not-md:ml-2">
      {imagePosition === 'left' ? (
        <>
          <div className="hidden md:block md:col-span-5"><StepImage>{image}</StepImage></div>
          <div className="md:col-span-2 h-full"><StepIndicator number={number} /></div>
          <div className="md:col-span-5">{contentElement}</div>
        </>
      ) : (
        <>
          <div className="-order-1 md:-order-3 md:col-span-5">{contentElement}</div>
          <div className="-order-2 md:-order-2 md:col-span-2 h-full"><StepIndicator number={number} /></div>
          <div className="md:-order-1 hidden md:block md:col-span-5"><StepImage>{image}</StepImage></div>
        </>
      )}
    </li>
  );
}
