import React from 'react'
import { useNewAddContext } from '../../contexts/AddContext'
import { NewAdd } from '@/lib/schemas'
import ReviewForm from '../../components/Forms/ReviewForm'

function page() {
  
  
  return (
    <div>
      <ReviewForm/>
    </div>
  )
}

export default page
