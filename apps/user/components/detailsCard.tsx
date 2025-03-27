"use client"
import { Button } from "@repo/ui/button";
import { redirect } from "next/navigation";

export default function DetailsCard({detailName, details, to, yesRequiredUpdation}: {detailName: string, details: string, to: string, yesRequiredUpdation: boolean})
{

    return (
        <div className="flex shadow-sm w-full">
            <div className="flex justify-between min-h-6 max-h-fit max-w-60 my-4 lg:justify-between px-6 min-w-max min-w-96 max-w-full">
                <div className="lg:px-6 mr-20">
                    {detailName}
                </div>
                <div className="flex justify-center pr-2 lg:px-6 ml-20">
                    {details}
                </div>
                {yesRequiredUpdation &&
                <Button onClickFunc={() => {
                    redirect(to)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                    </svg>
                </Button>}
            </div>
        </div>
    )
}
