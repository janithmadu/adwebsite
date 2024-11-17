import Link from "next/link";

export default function FaqHeader() {
  return (
    <div className="relative h-[200px] mb-12">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative h-full container mx-auto px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44">
        <div className="flex flex-col justify-center items-center h-full text-white space-y-4">
          <h1 className="text-4xl font-bold">FAQs</h1>
          <div className="flex items-center gap-2 text-sm">
            
          </div>
        </div>
      </div>
    </div>
  );
}