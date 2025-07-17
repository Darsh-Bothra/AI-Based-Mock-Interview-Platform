import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/action/auth.action'

const page = async () => {
  const user = await getCurrentUser();

  return (
    <div className='mt-[100px]'>   
        {/* <h3>Interview Generation</h3> */}
        <Agent userName={user?.name!} userId={user?.id} type="generate" />
    </div>
  )
}

export default page

