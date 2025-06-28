interface Props {
  splitId: number;
  token: string;
}

export default function ActionButtons({ splitId, token }: Props) {
  return (
    <form action={`/api/split/${splitId}/respond`} method="POST" className="flex flex-col sm:flex-row gap-4 justify-end">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="action" value="approve" />
      <button
        type="submit"
        name="action"
        value="reject"
        className="w-full sm:w-auto px-6 py-2 text-sm rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
      >
        Reject
      </button>
      <button
        type="submit"
        name="action"
        value="approve"
        className="w-full sm:w-auto px-6 py-2 text-sm rounded-full bg-[#a259ff] text-white hover:bg-[#8a3ee6] transition"
      >
        Approve & Pay
      </button>
    </form>
  );
}
