import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { colors } = useContext(ThemeContext);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Add your form submission logic here
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="opacity-80 mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="opacity-80">contact@example.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Phone</h3>
                <p className="opacity-80">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Location</h3>
                <p className="opacity-80">San Francisco, CA</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2">Message</label>
                <textarea
                  rows="5"
                  {...register("message", { required: "Message is required" })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.buttonText,
                }}
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
