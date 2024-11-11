import React from 'react';

import { getAllCategory } from '../../actions/getCategories';

const Page = async () => {
    const GetCategory = await getAllCategory();
    return (
        <div>
            Update
        </div>
    );
}

export default Page;
