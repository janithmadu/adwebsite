import React from 'react';

import { Book, Shield, Scale, MessageSquare, AlertCircle, CheckCircle2, Handshake, BadgeAlert } from 'lucide-react';
import { PageHeader } from '../components/Terms/PageHeader';
import { Section } from '../components/Terms/Section';
import { BulletList } from '../components/Terms/BulletList';
import { Footer } from '../components/Terms/Footer';


const Page = () => {
    return (
        <div>
             <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-3">
        <PageHeader 
          title="Terms & Conditions" 
          subtitle={`Last updated: ${new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}`}
        />

        <Section icon={Book} title="Agreement to Terms">
          <p className="text-gray-600 leading-relaxed">
            By accessing our website and using our services, you agree to be bound by these Terms and Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>
        </Section>

        <Section icon={Shield} title="Intellectual Property">
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              The Service and its original content, features, and functionality are owned by Your Company Name and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <BulletList items={[
              'All content is the exclusive property of Your Company Name',
              'You may not reproduce or distribute any content without permission',
              'Trademarks and logos are protected under intellectual property laws'
            ]} />
          </div>
        </Section>

        <Section icon={Scale} title="User Responsibilities">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Prohibited Activities</h3>
              <BulletList items={[
                'Violating laws or regulations',
                'Impersonating others',
                'Spreading malicious software',
                'Interfering with service security'
              ]} />
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">User Obligations</h3>
              <BulletList items={[
                'Maintain accurate account information',
                'Protect account credentials',
                'Report unauthorized access',
                'Comply with all applicable laws'
              ]} />
            </div>
          </div>
        </Section>

        <Section icon={AlertCircle} title="Disclaimers">
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
            <h3 className="font-medium text-gray-900 mb-3">Important Notice</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our services are provided &quot;as is&quot; without any warranties, expressed or implied. We do not guarantee that our services will be uninterrupted, timely, secure, or error-free. Your use of our services is at your sole risk.
            </p>
          </div>
        </Section>

        <Section icon={Handshake} title="Service Terms">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600 mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">Acceptable Use</h3>
              <BulletList items={[
                'Follow community guidelines',
                'Respect other users',
                'Use services as intended'
              ]} />
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <BadgeAlert className="w-6 h-6 text-red-600 mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">Termination</h3>
              <p className="text-gray-600 text-sm">
                We reserve the right to terminate or suspend access to our services immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </div>
          </div>
        </Section>

        <Section icon={MessageSquare} title="Contact Information">
          <div className="bg-indigo-50 p-6 rounded-lg">
            <p className="text-gray-600 text-sm">
              If you have any questions about these Terms & Conditions, please contact us:
              <br /><br />
              Email: info@q8arzaq.com<br />
              Phone: 96597397310+<br />
              Address: Arzaq Kuwait jahra
            </p>
          </div>
        </Section>

        <Footer />
      </div>
    </main>
        </div>
    );
}

export default Page;
