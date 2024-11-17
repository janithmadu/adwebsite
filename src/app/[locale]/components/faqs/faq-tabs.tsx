"use client";

import { Settings2, UserCircle2, CreditCard } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/[locale]/components/ui/tabs/tabs";
import FaqAccordion from "./faq-accordion";

const generalQuestions = [
  {
    question: "How do I post an advertisement?",
    answer:
      "To post an advertisement, log into your account and click on the 'Post Ad' button. Follow the simple steps to fill in your ad details, upload images, and submit for review.",
  },
  {
    question: "How long does it take for my ad to be approved?",
    answer:
      "Usually, ads are reviewed and approved within 24 hours. However, during peak times or holidays, it might take up to 48 hours.",
  },
  {
    question: "Can I edit my ad after posting?",
    answer:
      "Yes, you can edit your ad at any time by going to your dashboard and clicking on the 'Edit' button next to your ad.",
  },
  {
    question: "How long will my ad stay active?",
    answer:
      "Ads remain active for 30 days by default. You can renew or repost your ad after this period.",
  },
];

const accountQuestions = [
  {
    question: "How do I create an account?",
    answer:
      "Click on the 'Sign Up' button, fill in your details, verify your email address, and your account will be ready to use.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email.",
  },
  {
    question: "Can I have multiple accounts?",
    answer:
      "No, we allow only one account per user to maintain quality and prevent spam.",
  },
];

const paymentQuestions = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit cards, debit cards, and bank transfers for premium services.",
  },
  {
    question: "How do I get a refund?",
    answer:
      "Contact our support team with your order details, and they will guide you through the refund process.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No, all our fees are transparent and clearly displayed before you make any payment.",
  },
];

export default function FaqTabs() {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 max-w-[600px] mx-auto h-auto gap-4 bg-transparent">
        <TabsTrigger
          value="general"
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Settings2 className="h-4 w-4" />
          General
        </TabsTrigger>
        <TabsTrigger
          value="account"
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <UserCircle2 className="h-4 w-4" />
          Your Account
        </TabsTrigger>
        <TabsTrigger
          value="payment"
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <CreditCard className="h-4 w-4" />
          Money & payment
        </TabsTrigger>
      </TabsList>
      <div className="mt-8">
        <TabsContent value="general">
          <FaqAccordion items={generalQuestions} />
        </TabsContent>
        <TabsContent value="account">
          <FaqAccordion items={accountQuestions} />
        </TabsContent>
        <TabsContent value="payment">
          <FaqAccordion items={paymentQuestions} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
