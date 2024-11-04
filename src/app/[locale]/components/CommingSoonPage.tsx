"use client"; // Added "use client" directive at the top if required in your context
import React, { useEffect, useState } from 'react';

interface ComingSoon {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

interface CommingSoonDate {
  date: string;
}

const CommingSoonPage: React.FC<CommingSoonDate> = ({ date }) => {
  const calculateTimeLeft = (): ComingSoon => {
    const difference = +new Date(date) - +new Date();
    let timeLeft: ComingSoon = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<ComingSoon>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-900 text-white h-full flex flex-col items-center justify-center space-y-6 p-4 mb-5">
      <h1 className="text-4xl font-bold">We&apos;re Launching Soon!</h1>
      <p className="text-lg text-gray-400">
        Our site is under construction. Stay tuned for something amazing!
      </p>

      <div className="flex space-x-4 text-center">
        <div>
          <span className="block text-3xl font-bold">
            {timeLeft.days || "0"}
          </span>
          <span className="block text-gray-400">Days</span>
        </div>
        <div>
          <span className="block text-3xl font-bold">
            {timeLeft.hours || "0"}
          </span>
          <span className="block text-gray-400">Hours</span>
        </div>
        <div>
          <span className="block text-3xl font-bold">
            {timeLeft.minutes || "0"}
          </span>
          <span className="block text-gray-400">Minutes</span>
        </div>
        <div>
          <span className="block text-3xl font-bold">
            {timeLeft.seconds || "0"}
          </span>
          <span className="block text-gray-400">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CommingSoonPage;
