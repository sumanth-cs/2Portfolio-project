import { motion } from 'framer-motion';
import { Card } from '../ui/card.jsx';
// import { getFileView } from '../lib/appwrite/storage.js';
import { getFileView } from '@/lib/appwrite/storage.js';

function PortfolioSection({ portfolios }) {
  return (
    <motion.section
      id="portfolio"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-tertiary-100 py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-4xl font-bold text-center text-primary-mx-300 mb-12">Your Portfolios</h3>
        {portfolios.length === 0 ? (
          <p className="text-center text-on-surface">No portfolios yet. Create one in your dashboard!</p>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio) => (
              <Card key={portfolio._id} className="bg-surface shadow-lg">
                <img
                  src={getFileView(portfolio.photoId)}
                  alt={portfolio.title}
                  className="w-full h-48 object-cover rounded-t-lg rounded-lg"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-primary">{portfolio.title}</h4>
                  <p class="text-on-surface">{portfolio.description}</p>
                </div>
              </Card>
            ))}
          </div>)}
      </div>
    </motion.section>
  );
}

export default PortfolioSection;