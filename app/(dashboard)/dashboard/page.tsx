'use client'

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/dashboard/onboarding")
    },[])
    return (
        <div className="h-screen w-full flex items-center justify-center">
                <Loader2 className="size-4 animate-spin" />
        </div>
    )
}

export default DashboardPage;