import Link from "next/link";
import Image from "next/image";

const SidebarLogo = () => {
  return (
    <div className="flex justify-start items-center p-3 ml-1 md:ml-0 rounded-full hover:bg-neutral-200 transition">
      <Link href="/home">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={25}
          height={25}
          className="object-cover"
        />
      </Link>
    </div>
  );
};

export default SidebarLogo;
