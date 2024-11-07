import React from 'react';
import UpdateForm from '../../components/Forms/UpdateForm';
import { getAllCategory } from '../../actions/getCategories';

const Page = async () => {
    const GetCategory = await getAllCategory();
    return (
        <div>
            <UpdateForm categories={GetCategory}/>
        </div>
    );
}

export default Page;
