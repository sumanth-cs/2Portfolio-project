// // frontend/src/components/common/Hero.jsx
// import { motion } from 'framer-motion';
// import { Github, Linkedin, Twitter, Download, Share2 } from 'lucide-react';
// import { Button } from '../ui/button';

// function Hero({ bio }) {
//   const handleDownloadResume = () => {
//     // Replace with your actual resume URL
//     const resumeUrl = '/resume.pdf';
//     const link = document.createElement('a');
//     link.href = resumeUrl;
//     link.download = `${bio.name.replace(' ', '_')}_Resume.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleSharePortfolio = async () => {
//     try {
//       await navigator.share({
//         title: `${bio.name}'s Portfolio`,
//         text: `Check out ${bio.name}'s professional portfolio`,
//         url: window.location.href,
//       });
//     } catch (err) {
//       // Fallback for browsers that don't support Web Share API
//       navigator.clipboard.writeText(window.location.href);
//       alert('Portfolio link copied to clipboard!');
//     }
//   };

//   return (
//     <section id="home" className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
//       {/* Background with subtle bubbles */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute inset-0 bg-[url('/src/assets/background.jpg')] bg-cover bg-center opacity-50" />
//         {/* Colored bubbles */}
//         {[...Array(5)].map((_, i) => (
//           <div 
//             key={i}
//             className="absolute rounded-full opacity-20 blur-xl"
//             style={{
//               width: `${100 + Math.random() * 200}px`,
//               height: `${100 + Math.random() * 200}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               background: `hsl(${Math.random() * 360}, 80%, 60%)`,
//             }}
//           />
//         ))}
//       </div>
      
//       {/* Content */}
//       <div className="container mx-auto px-4 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center max-w-3xl mx-auto"
//         >
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="mx-auto mb-8 w-40 h-40 rounded-full border-2 border-white/20 overflow-hidden shadow-xl"
//           >
//             <img
//               src={bio.image || '/src/assets/profile.jpg'}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </motion.div>
          
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
//             {bio.name}
//           </h1>
          
//           <p className="text-xl sm:text-2xl text-primary-300 mb-8 max-w-md mx-auto">
//             {bio.title}
//           </p>
          
//           <div className="flex justify-center gap-4 mb-8">
//             {['github', 'linkedin', 'twitter'].map((social) => (
//               <motion.a
//                 key={social}
//                 href={`https://${social}.com`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ y: -5 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors"
//               >
//                 {social === 'github' && <Github className="w-5 h-5 text-white" />}
//                 {social === 'linkedin' && <Linkedin className="w-5 h-5 text-white" />}
//                 {social === 'twitter' && <Twitter className="w-5 h-5 text-white" />}
//               </motion.a>
//             ))}
//           </div>
          
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Button 
//               onClick={handleDownloadResume}
//               variant="primary"
//               size="lg"
//               className="group"
//             >
//               <Download className="w-5 h-5 mr-2" />
//               Download Resume
//             </Button>
//             <Button 
//               onClick={handleSharePortfolio}
//               variant="outline"
//               size="lg"
//               className="text-white border-white/30 hover:bg-white/10"
//             >
//               <Share2 className="w-5 h-5 mr-2" />
//               Share Portfolio
//             </Button>
//           </div>
//         </motion.div>
//       </div>
      
//       {/* Scroll indicator */}
//       <motion.div
//         animate={{ y: [0, 10, 0] }}
//         transition={{ repeat: Infinity, duration: 2 }}
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//       >
//         <div className="animate-bounce flex flex-col items-center">
//           <div className="w-4 h-4 border-b-2 border-r-2 border-white rotate-45" />
//           <span className="text-xs text-white/60 mt-1">Scroll</span>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

// export default Hero;

// frontend/src/components/common/Hero.jsx
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '../ui/button';

function Hero({ bio }) {
  const socialLinks = [
    { icon: <Github />, url: 'https://github.com' },
    { icon: <Linkedin />, url: 'https://linkedin.com' },
    { icon: <Mail />, url: 'mailto:contact@example.com' }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto mb-8 w-40 h-40 rounded-full border-4 border-white/20 overflow-hidden shadow-xl"
          >
            <img
              src={bio.image || '/src/assets/profile.jpg'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <p className="text-lg opacity-80">Hello, I'm</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{bio.name}</h1>
          <p className="text-xl md:text-2xl opacity-80 mb-8">{bio.title}</p>

          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="group">
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
            <Button variant="outline" size="lg">
              Contact Me
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;