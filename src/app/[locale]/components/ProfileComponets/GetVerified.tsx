import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import ContactImage from "../../../../../public/contact.png";

function GetVerified() {
  return (
    <Dialog>
      <DialogTrigger className="bg-primary500 p-2 text-white text-[16px] rounded-[4px] hover:bg-primary700 hover:shadow-lg">
        {" "}
        Get Verified
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center p-8">
              {/* Image Section */}
              <div className="w-full max-w-md mb-6 flex justify-center items-center">
                {/* Replace with your own image URL */}
                <Image
                  src={ContactImage}
                  alt="Contact Us"
                  className="w-[260px]"
                />
              </div>

              {/* Divider */}
              <hr className="w-full border-gray-300 my-4" />

              {/* Contact Heading */}
              <h2 className="text-xl font-bold text-gray-800">Contact us</h2>

              {/* Description */}
              <p className="text-gray-600 text-center my-4">
                Need help getting your membership or verified status? Verified
                users gain more trust and visibility, while memberships unlock
                exclusive features for your ads.
              </p>
              <p className="text-gray-600 text-center mb-6">
                If you have questions about the verification process or want to
                learn more about our membership options, our team is here to
                assist you. Reach out to us, and we’ll guide you every step of
                the way to boost your ad performance and credibility.
              </p>

              {/* Sub-heading */}
              <h3 className="text-lg font-medium text-gray-800 mt-6">
                You can reach us via:
              </h3>

              {/* Contact Methods */}
              <div className="flex flex-col md:flex-row gap-8 mt-6">
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="text-blue-500 text-3xl">📞</div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      Call us
                    </h4>
                    <p className="text-sm text-gray-600">96597397310+</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="text-blue-500 text-3xl">📧</div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      Email us
                    </h4>
                    <p className="text-sm text-gray-600">info@q8arzaq.com</p>
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default GetVerified;
