import Agent from '@/components/Agent'
import React from 'react'

const page = () => {
  return (
    <div className='mt-[100px]'>   
        {/* <h3>Interview Generation</h3> */}
        <Agent username="You" userId="person1" type="generate" />
    </div>
  )
}

export default page

