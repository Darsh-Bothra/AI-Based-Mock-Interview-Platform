import { useAuthContext } from "@/context/AuthContext"
import { Button } from "./ui/button";   
import Link from "next/link";

export const ActionBtn = () => {
    const reqAuth = useAuthContext();
    const handleOnClick = () => {
        if (!reqAuth) return;
        console.log("Feature accessed");
    }
    return (
        <>
            <Button className='btn-primary max-sm:w-full' onClick={handleOnClick}>
                <Link href="/interview">
                    Start an Interview
                </Link>
            </Button>
        </>
    )
}
