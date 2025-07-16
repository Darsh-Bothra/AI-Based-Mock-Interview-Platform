import { cn } from '@/lib/utils';
import Image from 'next/image'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    CONNECTING = 'CONNECTING',
    ENDED = 'ENDED'
}

const Agent = ({ username, userId, type }: AgentProps) => {
    const isSpeaking = true;
    const callStatus = CallStatus.ENDED;
    const msgs = [
        'What is your name',
        'My name is John Doe',
        'Nice to meet you'
    ]
    const lstMsg = msgs[msgs.length - 1];
    return (
        <>
            <div className='call-view'>
                <div className='card-interviewer'>
                    <div className='avatar'>
                        <Image
                            src="/ai-avatar.png"
                            alt="AI Avatar"
                            width={65} height={54}
                            className='object-cover'
                        />
                        {isSpeaking && <span className='animate-speak' />}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>
                <div className='card-border'>
                    <div className='card-content'>
                        <Image
                            src="/user-avatar.png"
                            alt='User Avatar'
                            width={540} height={540}
                            className='rounded-full object-cover size-[120px]'
                        />
                        <h3>{username}</h3>
                    </div>
                </div>
            </div>

            {msgs.length > 0 && (
                <div className='transcript-border mt-3'>
                    <div className='transcript'>
                        <p key={lstMsg} className={cn('transition-opacity duration-500 fade-in opacity-0', 'animate-fadeIn opacity-100')}>{lstMsg}</p>
                    </div>
                </div>
            )}

            <div className='w-full flex justify-center mt-3'>
                {
                    callStatus !== 'ACTIVE' ? (
                        <button className='relative btn-call'>
                            <span
                                className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' & 'hidden')}
                            />
                            <span>
                                {
                                    callStatus === 'INACTIVE' || callStatus === 'ENDED'
                                        ? 'Call'
                                        : '...'
                                }
                            </span>

                        </button>
                    ) : (
                        <button className='btn-disconnect'>
                            End Call
                        </button>
                    )
                }
            </div>
        </>
    )
}

export default Agent