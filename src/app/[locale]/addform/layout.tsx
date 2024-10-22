

export default function Layout({ children }: any) {
  return (
    <>
      <main className="container mx-auto  px-5 rtl:gap-20  lg:px-5 xl:px-20 md:px-10 mb-3 ">
        {" "}
        <div className="bg-white shadow-xl py-6 px-[32px]">
         {children}
        </div>
      </main>
    </>
  );
}
