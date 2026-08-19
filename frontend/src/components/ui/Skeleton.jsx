import { motion } from 'framer-motion';

const Skeleton = ({ className = '', variant = 'rect' }) => {
  const baseStyles = 'animate-shimmer bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:1000px_100%]';
  
  const variantStyles = {
    rect: 'rounded-xl',
    circle: 'rounded-full',
    text: 'rounded-md h-4',
    card: 'rounded-2xl',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.rect} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

// Product card skeleton for grid loading states
export const ProductCardSkeleton = () => {
  return (
    <div className="surface p-4 space-y-4">
      <Skeleton variant="rect" className="h-48 w-full" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <div className="flex justify-between items-center">
        <Skeleton variant="text" className="w-1/4" />
        <Skeleton variant="circle" className="h-10 w-10" />
      </div>
    </div>
  );
};

// Order card skeleton
export const OrderCardSkeleton = () => {
  return (
    <div className="surface p-6 space-y-4">
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="text" className="w-1/4" />
      </div>
      <Skeleton variant="rect" className="h-20 w-full" />
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-1/4" />
        <Skeleton variant="text" className="w-1/6" />
      </div>
    </div>
  );
};

// Cart item skeleton
export const CartItemSkeleton = () => {
  return (
    <div className="flex gap-4 p-4">
      <Skeleton variant="rect" className="h-20 w-20 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" className="w-1/4" />
      </div>
    </div>
  );
};

export { Skeleton };
export default Skeleton;
