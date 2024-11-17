import { Tabs } from "@/app/[locale]/components/ui/tabs/tabs";
import FaqHeader from "@/app/[locale]/components/faqs/faq-header";
import FaqTabs from "@/app/[locale]/components/faqs/faq-tabs";

export default function FaqsPage() {
  return (
    <>
      <FaqHeader />
      <main className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">Frequently asked question</h2>
          <p className="text-muted-foreground">
            Find answers to common questions about our services, account
            management, and payment processes.
          </p>
        </div>
        <FaqTabs />
      </main>
    </>
  );
}
