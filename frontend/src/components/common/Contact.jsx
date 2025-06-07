import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'react-hot-toast';

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log('Form submitted:', data);
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-display">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  contact@example.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Phone
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Location
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  San Francisco, CA
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register('name', { required: 'Name is required' })}
                  className="mt-2"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className="mt-2"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="How can I help you?"
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters',
                    },
                  })}
                  className="mt-2"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;