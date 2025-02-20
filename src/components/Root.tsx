
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Root() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      {isMobile && <BottomNav />}
    </div>
  );
}
