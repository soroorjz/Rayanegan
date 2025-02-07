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
import MessageForm from "./MessageForm";
import ChatBox from "./ChatBox";
import MenuItems from "./MenuItems";

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

      <MenuItems
        menuItems={menuItems}
        setHoveredItem={setHoveredItem}
        isOpen={isOpen}
        hoveredItem={hoveredItem}
      />

      {/* ✅ کامپوننت چت */}
      {isChatOpen && <ChatBox toggleChat={toggleChat} />}
      {/* ✅ کامپوننت فرم ارسال پیام */}
      {isMessageFormOpen && (
        <MessageForm
          toggleMessageForm={toggleMessageForm}
          formData={formData}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};

export default ChatBot;
