import { Link } from 'react-router-dom';
import { Keyboard, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Products', path: '/products' },
      { name: 'Keyboard Kits', path: '/products?category=Keyboard Kits' },
      { name: 'Keycaps', path: '/products?category=Keycaps' },
      { name: 'Switches', path: '/products?category=Switches' },
      { name: 'Accessories', path: '/products?category=Accessories' },
    ],
    account: [
      { name: 'My Orders', path: '/orders' },
      { name: 'Cart', path: '/cart' },
      { name: 'Sign In', path: '/login' },
      { name: 'Create Account', path: '/register' },
    ],
    info: [
      { name: 'About Us', path: '/' },
      { name: 'Shipping Policy', path: '/' },
      { name: 'Return Policy', path: '/' },
      { name: 'Privacy Policy', path: '/' },
      { name: 'Terms of Service', path: '/' },
    ],
  };

  return (
    <footer className="bg-base border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-copper to-copper-dark flex items-center justify-center">
                <Keyboard size={20} className="text-white" />
              </div>
              <span className="font-cabinet text-lg font-bold text-text-primary">
                ALPHA<span className="text-copper">KEYS</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Curating the finest mechanical keyboards and accessories for enthusiasts who demand precision, aesthetics, and that perfect thock.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Twitter, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-text-muted hover:text-copper hover:border-copper/50 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-cabinet text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-text-muted hover:text-copper transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="font-cabinet text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Account
            </h3>
            <ul className="space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-text-muted hover:text-copper transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="font-cabinet text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Information
            </h3>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-text-muted hover:text-copper transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © {currentYear} Alpha Keys. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
