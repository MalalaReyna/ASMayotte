import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center flex flex-col items-center gap-4">
        <div className="animate-spin">
          <LoaderCircle size={50}/>
        </div>
      </div>
    </div>
  );
}