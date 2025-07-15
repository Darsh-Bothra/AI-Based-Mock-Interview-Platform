'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';

const Page = () => {
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
    return (
        <>
            <section className='cart-cta'>
                <div className='flex flex-col gap-6 max-w-lg mt-[150px]'>
                    <div className='text-5xl font-semibold text-purple-400'>
                        Mock.Learn.Repeat
                    </div>
                    <h3 className='text-lg text-slate-300'>
                        Get actionable feedback from AI to upgrade your interview game and land your dream role.
                    </h3>
                    <Button asChild className='btn-primary max-sm:w-full'>
                        <Link href="/interview">
                            Start an Interview
                        </Link>
                    </Button>
                </div>
                {/* <TypewriterEffect words={words} />   */}
            </section>
            <section className='flex flex-col gap-6 mt-8'>
                <h2>Your Interviews</h2>
                <div className='flex flex-wrap gap-6'>
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))}
                </div>
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take Interviews</h2>
                <div className='flex flex-wrap gap-6'>
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))}
                </div>
            </section>
        </>
    )

}
export default Page
