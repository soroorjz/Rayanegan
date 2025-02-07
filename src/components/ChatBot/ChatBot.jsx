import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
  FaInstagram,
  FaWhatsapp,
  FaTimes,
  FaComment,
} from "react-icons/fa";
import "./ChatBot.scss";
import { useState } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    phone: "",
    department: "پشتیبانی",
  });

  const toggleMenu = () => {
    if (isOpen) {
      setIsChatOpen(false);
      setIsMessageFormOpen(false);
    }
    setIsOpen(!isOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) setIsMessageFormOpen(false);
  };

  const toggleMessageForm = () => {
    setIsMessageFormOpen(!isMessageFormOpen);
    if (!isMessageFormOpen) setIsChatOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const menuItems = [
    {
      icon: <FaComment />,
      key: "chat",
      label: "چت آنلاین",
      action: toggleChat,
    },
    {
      icon: <FaEnvelope />,
      key: "message",
      label: "ارسال پیام",
      action: toggleMessageForm,
    },
    {
      icon: <FaPhone />,
      key: "phone",
      label: "تماس",
      action: () => window.open("tel:02634164030"),
    },
    {
      icon: <FaPaperPlane />,
      key: "telegram",
      label: "تلگرام",
      action: () => window.open("https://t.me/rayanegan_support", "_blank"),
    },
    {
      icon: <FaInstagram />,
      key: "instagram",
      label: "اینستاگرام",
      action: () =>
        window.open(
          "https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Frayanegan_institute%2F&is_from_rle",
          "_blank"
        ),
    },
    {
      icon: <FaWhatsapp />,
      key: "whatsapp",
      label: "واتساپ",
      action: () =>
        window.open(
          "https://api.whatsapp.com/send?phone=+989018329109",
          "_blank"
        ),
    },
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
              onClick={item.action ? item.action : undefined}
            >
              {item.icon}
            </motion.button>

            {isOpen && hoveredItem === item.key && (
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

      {/* ✅ کامپوننت چت */}
      {isChatOpen && (
        <motion.div
          className="chat-box"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="chat-header">شروع گفتگو</div>
          <button className="close-chat" onClick={toggleChat}>
            <FaTimes size={16} />
          </button>
          <div className="chat-body">
            <p>متاسفانه فعلاً آنلاین نیستیم. پیام خود را ثبت کنید.</p>
          </div>
          <button className="chat-submit">لطفاً پیام بگذارید</button>
        </motion.div>
      )}

      {/* ✅ کامپوننت فرم ارسال پیام */}
      {isMessageFormOpen && (
        <motion.div
          className="message-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="form-header">
            پشتیبانی پیامکی پشتیبانی گویا
            <button className="close-btn" onClick={toggleMessageForm}>
              <FaTimes size={16} />
            </button>
          </div>
          <form className="form-body">
            <input
              type="text"
              name="name"
              placeholder="نام شما"
              value={formData.name}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="سوال شما"
              value={formData.message}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="شماره تلفن"
              value={formData.phone}
              onChange={handleChange}
            />
            <div className="department">
              <label>دپارتمان:</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="پشتیبانی">پشتیبانی</option>
                <option value="فروش">فروش</option>
                <option value="مالی">مالی</option>
              </select>
            </div>
            <button type="submit" className="submit-btn">
              لطفا پیام بگذارید
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default ChatBot;
