import { FaClipboard, FaHome, FaStore, FaUser } from 'react-icons/fa';
import { Link } from '@heroui/link';

const BottomNavigation = () => {
  return (
    <div className="flex justify-between bg-zinc-800/70 backdrop-blur-md px-6 text-secondary shadow-md fixed w-full max-w-sm rounded-xl bottom-4 left-1/2 transform -translate-x-1/2 z-50 py-4">
      <Link className="flex flex-col items-center gap-y-1" href="/market">
        <FaHome aria-label="Market" size={18} />
        <span className="text-xs">Market</span>
      </Link>
      <Link className="flex flex-col items-center gap-y-1" href="/stores">
        <FaStore aria-label="Store" size={18} />
        <span className="text-xs">Store</span>
      </Link>
      <Link className="flex flex-col items-center gap-y-1" href="/orders">
        <FaClipboard aria-label="Orders" size={18} />
        <span className="text-xs">Orders</span>
      </Link>
      <Link className="flex flex-col items-center gap-y-1" href="/profile">
        <FaUser aria-label="Profile" size={18} />
        <span className="text-xs">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
