import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Truck, Star } from 'lucide-react';
import SplitText from '../components/ui/SplitText';
import ShinyText from '../components/ui/ShinyText';
import SpotlightCard from '../components/ui/SpotlightCard';

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: 'Hot-Swap Ready',
      description: 'Swap switches without soldering. Customize your feel in seconds.',
    },
    {
      icon: Shield,
      title: 'Premium Build',
      description: 'CNC aluminum cases and double-shot PBT keycaps built to last.',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on all orders over $100. Fast, insured delivery.',
    },
    {
      icon: Star,
      title: 'Enthusiast Tested',
      description: 'Every product is sound-tested and approved by our team.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Happy Customers' },
    { value: '500+', label: 'Products Shipped Daily' },
    { value: '4.9', label: 'Average Rating' },
    { value: '24/7', label: 'Support Available' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-base via-base/95 to-base" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric/10 rounded-full blur-[128px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            <span className="text-sm text-text-muted">New: Tofu65 Hot-Swap Kit just dropped</span>
          </motion.div>

          <h1 className="font-cabinet text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <SplitText text="Elevate Your" delay={0.3} />
            <br />
            <ShinyText text="Typing Experience" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-text-muted max-w-2xl mx-auto mb-10"
          >
            Discover premium mechanical keyboards, artisan keycaps, and accessories 
            curated for enthusiasts who demand the perfect blend of sound, feel, and aesthetics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/products" className="btn-primary flex items-center gap-2 text-base">
              Shop Collection
              <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn-ghost text-base">
              Create Account
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-cabinet text-2xl lg:text-3xl font-bold text-copper mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-copper"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-cabinet text-3xl lg:text-4xl font-bold mb-4">
              Why Choose <span className="text-copper">Alpha Keys</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              We're not just a store. We're enthusiasts who obsess over every keystroke.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard className="surface p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center mb-4">
                    <feature.icon size={24} className="text-copper" />
                  </div>
                  <h3 className="font-cabinet text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-copper/5 to-electric/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-cabinet text-3xl lg:text-4xl font-bold mb-4">
            Ready to Find Your <span className="text-copper">Endgame</span>?
          </h2>
          <p className="text-text-muted mb-8 max-w-xl mx-auto">
            Join thousands of enthusiasts who've found their perfect keyboard setup with Alpha Keys.
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2 text-base">
            Browse Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
