import Link from 'next/link';
export function AccountBar() {
  return (
    <ul className="absolute right-0 flex flex-row space-x-6">
      <li className="text-xl hover:text-blue-900 hover:font-semibold">
        <Link href="/dashboard">Home</Link>
      </li>
    </ul>
  );
}