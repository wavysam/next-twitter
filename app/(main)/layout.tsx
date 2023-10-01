import { Inter } from "next/font/google";
import "../globals.css";

import SideBar from "@/components/layout/Sidebar";
import QueryProvider from "@/components/providers/QueryProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import { getAuthSession } from "@/lib/auth";
import { Session } from "next-auth";
import Rightbar from "@/components/Rightbar";
import prisma from "@/lib/prisma";

const inter = Inter({ weight: ["400", "500", "600"], subsets: ["latin"] });

export const metadata = {
  title: "X",
  description: "A twitter clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getAuthSession();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <QueryProvider>
          <div className="h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-row">
                <div className="fixed top-0">
                  <div className="hidden sm:basis-1/12 sm:flex md:basis-[22%]">
                    <SideBar session={session} alert={user?.hasNotication} />
                  </div>
                </div>
                <div className="sm:ml-[8.33%]  md:ml-[22%] basis-full lg:basis-1/2 border-x min-h-screen">
                  {children}
                </div>
                <div className="hidden lg:flex lg:basis-[33%]">
                  <Rightbar />
                </div>
              </div>
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
