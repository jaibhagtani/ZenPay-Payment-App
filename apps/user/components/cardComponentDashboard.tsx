import { redirect } from "next/navigation"
import ButtonSeeAllCard from "./buttonSeeAll"



export default function CardDashBoard({title, numberOfTitle, iconType, link}: {title:string,numberOfTitle: number, iconType: string, link: string})
{
    return (
        <div className="h-36 w-72 border-xl bg-[#A088F0] shadow-md rounded-lg mx-10 mb-16 lg:mb-6 max-w-screen">
            <div className="flex justify-between">
                <div className="bg-[#F9FAFB] my-10 ml-6 p-3 rounded-xl">
                    {iconType === "balance" ? <BalanceSVG></BalanceSVG>: ""}
                    {iconType === "transfer" ? <TransferIcon></TransferIcon>: ""}
                    {iconType === "transaction" ? <TrasactionIcon></TrasactionIcon>: ""}

                    
                </div>
                <div className="items-center pt-10 mx-8">
                    <div className="text-[#1F2937] text-xl">
                        {title}
                    </div>
                    <div className="py-4 flex justify-center font-bold font-lg text-[#1F2937]">
                        ₹ {numberOfTitle}
                    </div>
                </div>
                
            </div>
            <div className="bg-slate-300 h-10 px-8 flex jusitify-center rounded-lg">

                <ButtonSeeAllCard link={link}>
                    See all
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
                    </svg>
                </ButtonSeeAllCard>
            </div>
        </div>
    )
}
// #4B5563 or #6366F1

function BalanceSVG()
{
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>

        </div>
    )
}

function TrasactionIcon()
{
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="currentColor" className="w-8 h-8">
                <path fillRule="evenodd" d="M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>

        </div>
    )
}


function TransferIcon()
{
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
            </svg>

        </div>
    )
}