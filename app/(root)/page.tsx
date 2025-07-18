import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';
import { getInterviews, getInterviewsByUserId } from '@/lib/action/general.action';
import { getCurrentUser } from '@/lib/action/auth.action';
import Navbar from "@/components/NavBar";

const Page = async () => {
    const words = [
        {
            text: "Build",
        },
        {
            text: "awesome",
        },
        {
            text: "apps",
        },
        {
            text: "with",
        },
        {
            text: "Aceternity.",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];

    const user = await getCurrentUser();
    // this allows to fetch request parallely
    console.log("Current User ID:", user?.id);
    const [userInterviews, otherInterviews] = await Promise.all([
        await getInterviewsByUserId(user?.id!),
        await getInterviews({ userId: user?.id! })
    ]);
    const hasPastInterviews = userInterviews?.length > 0;
    const hasUpcomingInterviews = otherInterviews?.length > 0;
    console.log(userInterviews, otherInterviews);
    return (
        <>

            <Navbar />

            <section className='cart-cta'>
                <div className='flex flex-col gap-6 max-w-lg mt-[150px]'>
                    <div className='text-5xl font-semibold text-purple-400'>
                        Mock.Learn.Repeat
                    </div>
                    <h3 className='text-lg text-slate-300'>
                        Get actionable feedback from AI to upgrade your interview game and land your dream role.
                    </h3>
                    <Button className='btn-primary max-sm:w-full'>
                        <Link href="/interview">
                            Start an Interview
                        </Link>
                    </Button>
                    {/* <ActionBtn /> */}
                </div>
                {/* <TypewriterEffect words={words} />   */}
            </section>
            <section className='flex flex-col gap-6 mt-8'>
                <h2>Your Interviews</h2>
                <div className='flex flex-wrap gap-6'>
                    {
                        hasPastInterviews ? (
                            userInterviews?.map((interview) => (
                                <InterviewCard {...interview} key={interview.id} />
                            ))
                        ) : (<p>You haven&apos;t taken any interviews yet</p>)
                    }
                </div>
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take Interviews</h2>
                <div className='flex flex-wrap gap-6'>
                    {
                        hasUpcomingInterviews ? (
                            otherInterviews?.map((interview) => (
                                <InterviewCard {...interview} key={interview.id} />
                            ))
                        ) : (<p>No interviews available</p>)
                    }
                </div>
            </section>
        </>
    )

}
export default Page
