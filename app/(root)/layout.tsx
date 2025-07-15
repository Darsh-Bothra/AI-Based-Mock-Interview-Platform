import Navbar from '@/components/NavBar'
import React from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='root-layout'>
            <Navbar />
            {children}
        </div>
    )
}

export default HomeLayout