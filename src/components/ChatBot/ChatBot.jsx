import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaPaperPlane, FaInstagram, FaWhatsapp, FaTimes, FaComment } from "react-icons/fa";
import "./ChatBot.scss";
import { useState } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null); // استیت برای هاور کردن

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: <FaPhone />, key: "phone", label: "تماس" },
    { icon: <FaEnvelope />, key: "email", label: "ایمیل" },
    { icon: <FaPaperPlane />, key: "telegram", label: "تلگرام" },
    { icon: <FaInstagram />, key: "instagram", label: "اینستاگرام" },
    { icon: <FaWhatsapp />, key: "whatsapp", label: "واتساپ" },
    { icon: <FaEnvelope />, key: "second-email", label: "ایمیل دوم" },
    { icon: <FaComment />, key: "chat", label: "چت" }
  ];

  return (
    <div className="floating-menu">
      <motion.button
        onClick={toggleMenu}
        className={`menu-toggle ${isOpen ? "active" : ""}`}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaEnvelope size={24} />}
      </motion.button>

      <div className="menu-items">
        {menuItems.map((item, index) => (
          <div
            key={item.key}
            className="menu-item-container"
            onMouseEnter={() => setHoveredItem(item.key)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
              transition={{ duration: 0.3, delay: isOpen ? index * 0.1 : 0 }}
              className="menu-item"
            >
              {item.icon}
            </motion.button>

            {/* نمایش توضیحات در صورت هاور */}
            {hoveredItem === item.key && (
              <motion.div
                className="tooltip"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {isOpen && (
        <motion.div 
          className="chat-box"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="chat-header">شروع گفتگو</div>
          <div className="chat-body">
            <p>متاسفانه فعلاً آنلاین نیستیم. پیام خود را ثبت کنید.</p>
          </div>
          <button className="chat-submit">لطفاً پیام بگذارید</button>
        </motion.div>
      )}
    </div>
  );
};

export default ChatBot;
