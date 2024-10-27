import React from 'react';
import Pricing from '../components/Pricing/Pricing';
import { CheckUserLog } from '../actions/ChekAuth';

const Page =  async () => {
    const CheckAuth = await CheckUserLog()
    

    return (
        <div className='container mx-auto  px-5 rtl:gap-20  lg:px-5 xl:px-20 md:px-10 flex'>
            <Pricing/>
        </div>
    );
}

export default Page;
