'use client'

import { cn } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    CONNECTING = 'CONNECTING',
    ENDED = 'ENDED'
}

interface SavedMessage {
    role: 'user' | 'system' | 'assistant';
    content: string;
}

const Agent = ({ userName, userId, type }: AgentProps) => {
    const router = useRouter();
    const [isSpeaking, setisSpeaking] = useState(false);
    const [callStatus, setcallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    // This useEffect is to handle the event listeners
    useEffect(() => {
        const onCallStart = () => setcallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setcallStatus(CallStatus.ENDED);
        // What is this
        const onMessage = (m: Message) => {
            if (m.type === 'transcript' && m.transcriptType === 'final') {
                const newMessage = { role: m.role, content: m.transcript };
                setMessages((prev) => [...prev, newMessage]);
            }
        }

        const onSpeechStart = () => setisSpeaking(true);
        const onSpeechEnd = () => setisSpeaking(false);
        const onSpeechError = (error: Error) => {
            console.log('Error: ', error);
        }
        // first on the event listeners
        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('error', onSpeechError);

        // off the event listeners
        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
            vapi.off('error', onSpeechError);
        }
    }, []);

    // This useEffect is to handle the change
    useEffect(() => {
        if (callStatus === CallStatus.ENDED) {
            router.push('/');
        }
    }, [messages, callStatus, type, userId]);

    const handleCall = async () => {
        setcallStatus(CallStatus.CONNECTING);
        if (type === "generate") {
            await vapi.start(
                undefined,
                undefined,
                undefined, process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
                variableValues: {
                    username: userName,
                    userid: userId,
                },
            });
        }

    }

    const handleDisconnect = async () => {
        setcallStatus(CallStatus.ENDED);
        vapi.stop();
    }

    const lastMessage = messages[messages.length - 1]?.content;
    const isCallInActiveOrEnded = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.ENDED;

    
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
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {messages.length > 0 && (
                <div className='transcript-border mt-3'>
                    <div className='transcript'>
                        <p key={lastMessage} className={cn('transition-opacity duration-500 fade-in opacity-0', 'animate-fadeIn opacity-100')}>{lastMessage}</p>
                    </div>
                </div>
            )}

            <div className='w-full flex justify-center mt-3'>
                {
                    callStatus !== 'ACTIVE' ? (
                        <button className='relative btn-call' onClick={handleCall}>
                            <span
                                className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' && 'hidden')}
                            />
                            <span>
                                {
                                    isCallInActiveOrEnded ? 'Call' : '. . .'
                                }
                            </span>

                        </button>
                    ) : (
                        <button className='btn-disconnect' onClick={handleDisconnect}>
                            End Call
                        </button>
                    )
                }
            </div>
        </>
    )
}

export default Agent