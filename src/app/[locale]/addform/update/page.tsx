import React from 'react';

import { getAllCategory } from '../../actions/getCategories';
import UpdateForm from '../../components/Forms/UpdateForm';

const Page = async () => {
    const GetCategory = await getAllCategory();
    return (
        <div>
            <UpdateForm categories={GetCategory}/>
        </div>
    );
}

export default Page;
