import Navbar from '@/components/NavBar'
import { isAuthenticated } from '@/lib/action/auth.action'
import { AuthProvider } from '@/context/AuthContext'
import LoginModal from '@/components/Modal'
import { redirect } from 'next/navigation'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
    const isUserAuthenticated = await isAuthenticated();
    if(!isUserAuthenticated) {
        redirect('/sign-in');
    }
    return (
        <div className='root-layout'>
            <AuthProvider>
                <Navbar />
                {children}
                <LoginModal />
            </AuthProvider>
        </div>
    )
}

export default HomeLayout