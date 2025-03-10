import { FaHome, FaShoppingCart, FaStore, FaUser } from 'react-icons/fa';
import { Link } from '@heroui/link';

const BottomNavigation = () => {
  return (
    <div className="flex justify-between bg-zinc-900 px-6 text-secondary shadow-md fixed w-full max-w-sm rounded-md bottom-4 left-1/2 transform -translate-x-1/2 z-50 py-4">
      <Link className="flex flex-col items-center gap-y-1" href="/market">
        <FaHome size={18} />
        <span className="text-xs">Market</span>
      </Link>
      <Link className="flex flex-col items-center gap-y-1" href="/store">
        <FaStore size={18} />
        <span className="text-xs">Store</span>
      </Link>
      <Link className="flex flex-col items-center gap-y-1" href="/orders">
        <FaShoppingCart size={18} />
        <span className="text-xs">Orders</span>
      </Link>
      <Link className="flex flex-col items-center gap-y-1" href="/profile">
        <FaUser size={18} />
        <span className="text-xs">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
