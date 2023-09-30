import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-6">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
};

export default Loader;
