import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePortfolio } from "../../contexts/PortfolioContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";

function Contact() {
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  const { colors } = useTheme();
  const { portfolioData } = usePortfolio();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [isEmailJsReady, setIsEmailJsReady] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_PUBLIC_KEY);
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
      toast.error("Admin email not configured");
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
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send message");
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
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: colors.primary }}
          >
            Get In Touch
          </h2>
          <p className="text-lg" style={{ color: colors.text }}>
            Have a question or want to work together? Send me a message!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="name"
                className="block mb-2"
                style={{ color: colors.text }}
              >
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
              <Label
                htmlFor="email"
                className="block mb-2"
                style={{ color: colors.text }}
              >
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
            <Label
              htmlFor="message"
              className="block mb-2"
              style={{ color: colors.text }}
            >
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
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          {!adminEmail && (
            <p className="text-red-500 text-sm">
              Admin email not configured. Please ask the portfolio owner to set
              their email in the bio.
            </p>
          )}
        </form>
      </div>
    </motion.section>
  );
}

export default Contact;
