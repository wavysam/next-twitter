import Image from "next/image";
import RegisterModal from "./_components/register-modal";
import LoginModal from "./_components/login-modal";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center min-h-screen">
          <div className="flex flex-1 justify-center mt-10 sm:mt-0">
            <div className="hidden sm:block">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
            <div className="sm:hidden block">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-start flex-1">
            <h1 className="text-6xl font-extrabold">Happening now</h1>
            <p className="text-3xl font-extrabold mt-14">Join today.</p>

            <div className="flex flex-col mt-6">
              <RegisterModal />
              <p className="text-xs max-w-xs mt-1">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>
            </div>

            <div className="flex flex-col gap-y-6 mt-16">
              <h3 className="text-lg font-semibold">
                Already have an account?
              </h3>
              <LoginModal />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
