import type { ReactNode } from "react";
import { CategoryNav } from "@/components/shop/category-nav";
import { Footer } from "@/components/shop/footer";
import { Header } from "@/components/shop/header";
import { UspBar } from "@/components/shop/usp-bar";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <CategoryNav />
      <UspBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
