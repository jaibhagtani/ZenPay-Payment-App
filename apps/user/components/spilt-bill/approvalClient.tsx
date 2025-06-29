import ActionButtons from "./actionButtons";
import YourSplitDetail from "./detailsCards";
import Header from "./header";
import Metadata from "./metaData";
import ParticipantList, { SplitBillApprovalProps } from "./participants";

export default function SplitBillApproval({ splitDetails, body }: SplitBillApprovalProps) {
  if (!splitDetails) {
    return <div className="p-6 text-center">Split not found...</div>;
  }

  const userSplit = splitDetails.splits.find((entry) => entry.id === Number(body.splitId));

  return (
    <div className="w-full min-h-screen bg-[#fdf0f6] py-10 px-4 sm:px-6 md:px-10">
      <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
        <Header title="Approve Split Payment" />
        <div className="w-full p-4 sm:p-6 md:p-10 xl:p-16 space-y-8">
          <Metadata
            description={splitDetails.description || ""}
            createdBy={splitDetails.createdByUser.name || ""}
            createdAt={new Date(splitDetails.createdAt)}
          />
          <ParticipantList
            participants={splitDetails.splits}
            total={splitDetails.totalAmount}
          />
          {userSplit && <YourSplitDetail entry={userSplit} />}
          {userSplit?.status === "PENDING" && (
            <ActionButtons splitId={userSplit.id} token={body.token} splitBillId={body.splitBillId} />
          )}
        </div>
      </div>
    </div>
  );
}
