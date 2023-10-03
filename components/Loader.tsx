import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center my-6">
      <Loader2 className="h-6 w-6 text-sky-500 animate-spin" />
    </div>
  );
};

export default Loader;
