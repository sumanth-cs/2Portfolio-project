// import { motion } from "framer-motion";
// import { Mail, MapPin, Phone } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { Button } from "../ui/button";
// import { useContext, useState } from "react";
// import { ThemeContext } from "@/contexts/ThemeContext";
// import { PortfolioContext, usePortfolio } from "@/contexts/PortfolioContext";
// import emailjs from '@emailjs/browser';
// import { toast } from "react-hot-toast";

// function Contact() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();
//   const { colors } = useContext(ThemeContext);
//   const { portfolioData } = useContext(PortfolioContext);
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const templateParams = {
//         from_name: data.name,
//         from_email: data.email,
//         message: data.message,
//         to_email: portfolioData.bio?.email || 'contact@example.com'
//       };

//       await emailjs.send(
//         import.meta.env.VITE_EMAILJS_SERVICE_ID,
//         import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//         templateParams,
//         import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//       );

//       toast.success("Message sent successfully!");
//       reset();
//     } catch (error) {
//       console.error("Email send error:", error);
//       toast.error("Failed to send message. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const safeBio = portfolioData.bio || {};

//   return (
//     <section id="contact" className="py-20 px-4">
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <p className="opacity-80 mb-2">Get In Touch</p>
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
//         </motion.div>

//         <div className="flex flex-col md:flex-row gap-12">
//           <motion.div
//             initial={{ x: -50, opacity: 0 }}
//             whileInView={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className="md:w-1/2 space-y-6"
//           >
//             <div className="flex items-start gap-4">
//               <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
//                 <Mail className="w-5 h-5" />
//               </div>
//               <div>
//                 <h3 className="font-medium mb-1">Email</h3>
//                 <p className="opacity-80">{safeBio.email || 'contact@example.com'}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
//                 <Phone className="w-5 h-5" />
//               </div>
//               <div>
//                 <h3 className="font-medium mb-1">Phone</h3>
//                 <p className="opacity-80">{safeBio.phone || '+1 (555) 123-4567'}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
//                 <MapPin className="w-5 h-5" />
//               </div>
//               <div>
//                 <h3 className="font-medium mb-1">Location</h3>
//                 <p className="opacity-80">{safeBio.location || 'San Francisco, CA'}</p>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ x: 50, opacity: 0 }}
//             whileInView={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className="md:w-1/2"
//           >
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div>
//                 <label className="block mb-2">Name</label>
//                 <input
//                   type="text"
//                   {...register("name", { required: "Name is required" })}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block mb-2">Email</label>
//                 <input
//                   type="email"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: "Invalid email address",
//                     },
//                   })}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block mb-2">Message</label>
//                 <textarea
//                   rows="5"
//                   {...register("message", { required: "Message is required" })}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
//                 ></textarea>
//                 {errors.message && (
//                   <p className="text-red-500 text-sm mt-1">{errors.message?.message}</p>
//                 )}
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full text-white"
//                 disabled={loading}
//                 style={{ backgroundColor: colors.primary, color: colors.buttonText }}
//               >
//                 {loading ? "Sending..." : "Send Message"}
//               </Button>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Contact;

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

function Contact() {
  const { colors } = useTheme();
  const { portfolioData } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [isEmailJsReady, setIsEmailJsReady] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
    setIsEmailJsReady(true);

    // Get admin email from bio
    if (portfolioData?.bio?.email) {
      setAdminEmail(portfolioData.bio.email);
    }
  }, [portfolioData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!adminEmail) {
      toast.error('Admin email not configured');
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        to_email: adminEmail, // Admin's email from bio
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        'YOUR_EMAILJS_SERVICE_ID',
        'YOUR_EMAILJS_TEMPLATE_ID',
        templateParams
      );

      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
            Get In Touch
          </h2>
          <p className="text-lg" style={{ color: colors.text }}>
            Have a question or want to work together? Send me a message!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="block mb-2" style={{ color: colors.text }}>
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full"
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.secondary,
                }}
              />
            </div>
            <div>
              <Label htmlFor="email" className="block mb-2" style={{ color: colors.text }}>
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.secondary,
                }}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="message" className="block mb-2" style={{ color: colors.text }}>
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full"
              style={{
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.secondary,
              }}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !isEmailJsReady || !adminEmail}
            className="w-full md:w-auto"
            style={{
              backgroundColor: colors.primary,
              color: colors.buttonText,
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
          {!adminEmail && (
            <p className="text-red-500 text-sm">
              Admin email not configured. Please ask the portfolio owner to set their email in the bio.
            </p>
          )}
        </form>
      </div>
    </motion.section>
  );
}

export default Contact;