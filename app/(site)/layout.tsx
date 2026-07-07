import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { getPageContent } from "@/lib/content/get";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getPageContent("settings");

  return (
    <>
      <SiteHeader headerLogo={settings.headerLogo} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
