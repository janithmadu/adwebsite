import Link from "next/link";
import { UserPlus, FileText, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      {/* Hero Header */}
      <div className="relative h-[200px] mb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative h-full container mx-auto px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44">
          <div className="flex flex-col justify-center items-center h-full text-white space-y-4">
            <h1 className="text-4xl font-bold">About Us</h1>
            <div className="flex items-center gap-2 text-sm"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-12">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Know more about Arzaq</h2>
            <p className="text-muted-foreground">
              Arzaq is your go-to platform for buying and selling almost
              anything. Whether it&apos;s within your city or your neighborhood,
              the best deals are made locally. With Arzaq, it&apos;s simple to
              connect with buyers and sellers near you. Just select your region,
              and you&apos;re ready to explore! Posting an ad on Arzaq is quick
              and hassle-free, taking less than 2 minutes. Sign up for a free
              account to easily manage your ads anytime.
            </p>
            <p className="text-muted-foreground">
              Arzaq offers the widest range of popular new and second-hand items
              across Kuwait. Whatever you&apos;re looking for, Arzaq makes it
              easy to find and connect.
            </p>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden bg-muted">
            <div className="absolute inset-0 flex items-center justify-center"></div>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
              alt="Office team meeting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* How it Works Section */}
        <div className="text-center space-y-12">
          <h2 className="text-3xl font-bold">How it Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative p-6 bg-card rounded-xl shadow-sm">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center">
                  <UserPlus className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="text-6xl font-bold text-muted/20">01</div>
                <h3 className="text-xl font-semibold">Create Account</h3>
                <p className="text-muted-foreground">
                  Sign up for free to start buying and selling effortlessly on
                  Arzaq. Manage your ads with ease and connect with local buyers
                  and sellers today!
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 bg-card rounded-xl shadow-sm">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="text-6xl font-bold text-muted/20">02</div>
                <h3 className="text-xl font-semibold">Post a Ads</h3>
                <p className="text-muted-foreground">
                  List your items in just minutes! Posting an ad on Arzaq is
                  quick, easy, and completely free. Reach local buyers
                  instantly!
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 bg-card rounded-xl shadow-sm">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="text-6xl font-bold text-muted/20">03</div>
                <h3 className="text-xl font-semibold">Start Earning</h3>
                <p className="text-muted-foreground">
                  Begin your journey today by posting ads on Arzaq! Sell your
                  items locally and make extra income in no time. Sign up now
                  and start earning!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
