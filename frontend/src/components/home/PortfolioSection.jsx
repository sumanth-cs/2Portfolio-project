// /**
//  * Portfolio section displaying user projects.
//  */
// import { motion } from 'framer-motion';

// function PortfolioSection({ portfolios, loading, error }) {
//   if (loading) {
//     return <div className="text-center py-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-8 text-red-500">{error}</div>;
//   }

//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="py-12 bg-gray-100 dark:bg-gray-900"
//     >
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-8">My Portfolio</h2>
//         {portfolios.length === 0 ? (
//           <p className="text-center text-gray-600 dark:text-gray-400">
//             No portfolios found. Create one to showcase your work!
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {portfolios.map((portfolio, index) => (
//               <motion.div
//                 key={portfolio._id || `portfolio-${index}`}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
//               >
//                 <img
//                   src={portfolio.image || 'https://picsum.photos/300/200'}
//                   alt={portfolio.title}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => (e.target.src = '/fallback-image.jpg')}
//                 />
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold">{portfolio.title}</h3>
//                   <p className="text-gray-600 dark:text-gray-400 mt-2">
//                     {portfolio.description || 'No description available'}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {portfolio.tags?.map((tag, tagIndex) => (
//                       <span key={tagIndex} className="px-2 py-1 bg-primary-200 text-white rounded text-sm">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </motion.section>
//   );
// }

// export default PortfolioSection;