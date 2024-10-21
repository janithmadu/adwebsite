import Image from 'next/image'
import React from 'react'

function Reletedads() {
  return (
    <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Related Ads</h2>
        <div className="grid grid-cols-4 gap-4">
          {/* Example of a related ad */}
          <div className="border p-4 rounded-lg">
            <Image
              src="/related-ad1.jpg"
              alt="Related Ad"
              width={300}
              height={200}
              className="rounded-lg"
            />
            <p className="mt-2 text-lg font-semibold">Mercedes Benz</p>
            <p className="text-gray-600">$70,000</p>
          </div>
          {/* More related ads */}
        </div>
      </div>
  )
}

export default Reletedads
