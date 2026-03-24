import { Link } from "react-router-dom";
import {
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-10 px-6 md:px-16">
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* LEFT - LOGO */}
        <div className="text-2xl font-bold text-[red]">
          Pinterest
        </div>

        {/* CENTER - LINKS */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-300">
          <Link to="/about" className="hover:text-white transition">
            About
          </Link>
          <Link to="/privacy" className="hover:text-white transition">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-white transition">
            Terms
          </Link>
        </div>

        {/* RIGHT - SOCIAL ICONS */}
        <div className="flex items-center gap-4 text-xl">
          
          <a href="https://www.linkedin.com/in/zen-allaham-789907370/" target="_blank" className="hover:text-[red] transition">
            <FaLinkedin />
          </a>

          <a href="https://github.com/ZenZN99" target="_blank" className="hover:text-[red] transition">
            <FaGithub />
          </a>

          <a href="https://www.facebook.com/profile.php?id=61579430121762" target="_blank" className="hover:text-[red] transition">
            <FaFacebook />
          </a>

          <a href="https://www.instagram.com/zen.allaham/" target="_blank" className="hover:text-[red] transition">
            <FaInstagram />
          </a>

          <a href="https://wa.me/905546726683" target="_blank" className="hover:text-[red] transition">
            <FaWhatsapp />
          </a>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} Pinterest Clone. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;