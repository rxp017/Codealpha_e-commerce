import { motion } from 'framer-motion';
import { MapPin, Package, CheckCircle2 } from 'lucide-react';

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Shipping', icon: MapPin },
    { id: 2, label: 'Review', icon: Package },
    { id: 3, label: 'Complete', icon: CheckCircle2 },
  ];

  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                scale: currentStep === step.id ? 1.1 : 1,
                backgroundColor:
                  currentStep >= step.id
                    ? 'rgba(232, 135, 58, 1)'
                    : 'rgba(255, 255, 255, 0.05)',
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                currentStep >= step.id
                  ? 'border-copper text-white'
                  : 'border-white/10 text-text-muted'
              }`}
            >
              {currentStep > step.id ? (
                <CheckCircle2 size={20} />
              ) : (
                <step.icon size={20} />
              )}
            </motion.div>
            <span
              className={`mt-2 text-xs font-medium ${
                currentStep >= step.id ? 'text-copper' : 'text-text-muted'
              }`}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div className="w-16 sm:w-24 h-0.5 mx-2 sm:mx-4 mb-6 relative overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-white/10" />
              <motion.div
                initial={{ width: '0%' }}
                animate={{
                  width: currentStep > step.id ? '100%' : '0%',
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-copper"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
