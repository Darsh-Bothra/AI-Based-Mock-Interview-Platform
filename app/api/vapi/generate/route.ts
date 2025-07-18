import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";


export async function GET() {
    return Response.json({
        success: true,
        message: "Success"
    }, { status: 200 });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // console.log("Incoming body:", JSON.stringify(body, null, 2));

        // Check if it's a tool call from assistant
        const rawArgs = body?.message?.toolCallList?.[0]?.function?.arguments;

        let type, role, level, techstack, amount, userid;

        if (rawArgs) {
            // If from assistant, parse the arguments
            ({ type, role, level, techstack, amount, userid } = JSON.parse(rawArgs));
        } else {
            // Fallback: standard API request (e.g. from your own frontend or workflow)
            ({ type, role, level, techstack, amount, userid } = body);
        }

        const { text: questions } = await generateText({
            model: google('gemini-2.0-flash-001'),
            prompt: `Prepare questions for a job interview.
                    The job role is ${role}.
                    The job experience level is ${level}.
                    The tech stack used in the job is: ${techstack}.
                    The focus between behavioural and technical questions should lean towards: ${type}.
                    The amount of questions required is: ${amount}.
                    Please return only the questions, without any additional text.
                    The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
                    Return the questions formatted like this:
                    ["Question 1", "Question 2", "Question 3"]
                    
                    Thank you! <3`,
        });

        const interview = {
            role,
            type,
            level,
            techstack: techstack.split(","),
            questions: JSON.parse(questions),
            userId: userid,
            finalized: true,
            converImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString()
        };

        await db.collection("interviews").add(interview);

        return Response.json({ success: true, debug: body }, { status: 200 });

    } catch (error : any) {
        console.error("Error in interview generation route:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
