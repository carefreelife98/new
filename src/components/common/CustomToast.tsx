"use client";

import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";

interface CustomToastProps {
    title: string;
    content: string;
}

export default function CustomToast({title, content}: CustomToastProps) {
    const { toast } = useToast()

    return (
        <Button
            onClick={() => {
                toast({
                    title: title,
                    description: content,
                })
            }}
        >
            Show Toast
        </Button>
    )
}
