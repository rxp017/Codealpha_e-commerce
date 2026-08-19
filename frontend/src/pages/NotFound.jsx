import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Keyboard, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center max-w-md mx-auto">
        {/* Animated Keyboard Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-copper/20 to-electric/20 flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: [0, -5, 5, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Keyboard size={64} className="text-copper" />
            </motion.div>
          </div>
          
          {/* Floating keycaps */}
          <motion.div
            animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 left-8 w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs font-mono text-text-muted"
          >
            4
          </motion.div>
          <motion.div
            animate={{ y: [5, -5, 5], rotate: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-8 right-12 w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs font-mono text-text-muted"
          >
            0
          </motion.div>
          <motion.div
            animate={{ y: [-3, 7, -3], rotate: [5, 0, 5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-12 right-4 w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs font-mono text-text-muted"
          >
            4
          </motion.div>
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-cabinet text-6xl lg:text-7xl font-bold mb-4"
        >
          <span className="text-copper">4</span>
          <span className="text-text-primary">0</span>
          <span className="text-electric">4</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl text-text-primary font-medium mb-2"
        >
          Key Not Found
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-text-muted mb-8"
        >
          The page you're looking for has been disconnected. 
          Let's get you back to typing paradise.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <Link to="/products" className="btn-ghost flex items-center gap-2 w-full sm:w-auto justify-center">
            <Search size={18} />
            Browse Products
          </Link>
        </motion.div>

        {/* Fun keyboard hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-xs text-text-muted"
        >
          Pro tip: Try pressing <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 font-mono">ESC</kbd> to escape this situation
        </motion.p>
      </div>
    </motion.div>
  );
};

export default NotFound;
