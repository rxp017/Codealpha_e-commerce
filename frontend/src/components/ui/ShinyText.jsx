import { motion } from 'framer-motion';

const ShinyText = ({ text, className = '' }) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial={{ backgroundPosition: '200% center' }}
      animate={{ backgroundPosition: '-200% center' }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundImage: 'linear-gradient(120deg, #F5F5F2 40%, #E8873A 50%, #4F8CFF 60%, #F5F5F2 70%)',
        backgroundSize: '200% auto',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
