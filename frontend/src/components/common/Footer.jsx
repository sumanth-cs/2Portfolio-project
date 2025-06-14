import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { PortfolioContext } from "../../contexts/PortfolioContext";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ThemeContext } from "@/contexts/ThemeContext";

function Footer() {
  const { user } = useContext(AuthContext);
  const { portfolioData } = useContext(PortfolioContext);
  const { colors } = useContext(ThemeContext);

  const safeBio = portfolioData.bio || {};
  const social = Array.isArray(safeBio.social) ? safeBio.social : [];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      url: social.find((s) => s?.name?.toLowerCase() === "github")?.link || "https://github.com",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      url: social.find((s) => s?.name?.toLowerCase() === "linkedin")?.link || "https://linkedin.com",
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      url: social.find((s) => s?.name?.toLowerCase() === "twitter")?.link || "https://twitter.com",
    },
  ];

  return (
    <footer className="py-12 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <p className="text-lg font-bold">Portfolio</p>
            <p className="opacity-80">Showcase your professional work</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {user ? (
              <Button
                asChild
                style={{ backgroundColor: colors.primary, color: colors.buttonText }}
              >
                <Link to="/dashboard">Edit Portfolio</Link>
              </Button>
            ) : (
              <Button
                asChild
                style={{ backgroundColor: colors.primary, color: colors.buttonText }}
              >
                <Link to="/signup">Create Your Portfolio</Link>
              </Button>
            )}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8 opacity-60"
        >
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}

export default Footer;