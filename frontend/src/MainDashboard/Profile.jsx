


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
// import { Menu, X } from "lucide-react";
import { Menu, X, Home, User, HelpCircle, ShoppingBag, Users } from "lucide-react";
import "./Profile.css";

function Profile() {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("/default-profile.png");
  const [newPhoto, setNewPhoto] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isManualLogin, setIsManualLogin] = useState(true);

  const userId = localStorage.getItem("userId");

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isSidebarOpen && 
          !event.target.closest('.profile-sidebar') && 
          !event.target.closest('.mobile-menu-toggle')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  // Fetch user data
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:2008/api/user/${userId}`)
      .then((res) => {
        const data = res.data;
        setUsername(data.name || localStorage.getItem("username") || "");
        setEmail(data.email || localStorage.getItem("email") || "");
        setPhoto(
          data.photo
            ? `http://localhost:2008${data.photo}`
            : "/default-profile.png"
        );
        setIsManualLogin(data.password ? true : false);
      })
      .catch((err) => {
        console.log("Backend fetch failed, fallback to localStorage", err);
        setUsername(localStorage.getItem("username") || "");
        setEmail(localStorage.getItem("email") || "");
        setPhoto(localStorage.getItem("photo") || "/default-profile.png");
      });
  }, [userId]);

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [window.location.pathname]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const handlePhotoChange = async () => {
    if (!newPhoto) return alert(t("fillAllFields"));

    const formData = new FormData();
    formData.append("photo", newPhoto);

    try {
      const res = await axios.put(
        `http://localhost:2008/api/user/photo/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPhoto(`http://localhost:2008${res.data.photo}`);
      localStorage.setItem("photo", res.data.photo);
      alert(t("changePhoto") + " " + t("success"));
    } catch (err) {
      console.log(err);
      alert(t("error"));
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:2008/api/user/${userId}`,
        { name: username }
      );
      setUsername(res.data.name);
      localStorage.setItem("username", res.data.name);
      alert(t("updateUsername") + " " + t("success"));
    } catch (err) {
      console.log(err);
      alert(t("error"));
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) return alert(t("fillAllFields"));

    try {
      await axios.put(
        `http://localhost:2008/api/user/password/${userId}`,
        {
          currentPassword,
          newPassword,
        }
      );
      alert(t("updatePassword") + " " + t("success"));
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || t("error"));
    }
  };

  return (
    <div className="profile-page-container">
      {/* ================= MOBILE NAVBAR ================= */}
      {isMobile && (
        <div className="mobile-navbar">
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="mobile-logo">
            <h3>Profile</h3>
          </div>
          
          <div className="mobile-profile">
            <img
              src={
                userId
                  ? `http://localhost:2008/api/images/${userId}/profile`
                  : "/profile.png"
              }
              alt="User"
              className="mobile-profile-pic"
              onError={(e) => {
                e.target.src = "/profile.png";
              }}
            />
          </div>
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      <div className={`profile-sidebar ${isMobile ? (isSidebarOpen ? 'mobile-open' : 'mobile-closed') : ''}`}>
        <div className="sidebar-close-container">
          <div className="profile-sidebar-section">
            <img
              src={
                userId
                  ? `http://localhost:2008/api/images/${userId}/profile`
                  : "/profile.png"
              }
              alt="User"
              className="profile-sidebar-pic"
              onError={(e) => {
                e.target.src = "/profile.png";
              }}
            />
            <h5>{username || "User"}</h5>
          </div>

          {isMobile && (
            <button 
              className="sidebar-close-btn"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <ul className="profile-menu">
          <li>
            <Link to="/profile" className="profile-menu-btn active" onClick={() => setIsSidebarOpen(false)}>
              <User size={18} />  {t("profile")}
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="profile-menu-btn" onClick={() => setIsSidebarOpen(false)}>
             <Home size={18} />   {t("dashboard")}
            </Link>
          </li>
          <li>
            <Link to="/helpcenter" className="profile-menu-btn" onClick={() => setIsSidebarOpen(false)}>
           <HelpCircle size={18} />     {t("helpCenter")}
            </Link>
          </li>
          <li>
            <Link to="/dealers" className="profile-menu-btn" onClick={() => setIsSidebarOpen(false)}>
             <ShoppingBag size={18} />   {t("dealers")}
            </Link>
          </li>
          <li>
            <Link to="/agents" className="profile-menu-btn" onClick={() => setIsSidebarOpen(false)}>
           <Users size={18} />     {t("agents")}
            </Link>
          </li>
        </ul>

        {/* ================= LANGUAGE ================= */}
        <div className="profile-language-section">
          <h6>{t("chooseLanguage")}</h6>
          <select
            className="profile-language-select"
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="bn">বাংলা</option>
            <option value="as">অসমীয়া</option>
            <option value="ta">தமிழ்</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="mr">मराठी</option>
          </select>
        </div>
      </div>

      {/* ================= OVERLAY FOR MOBILE ================= */}
      {isMobile && isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* ================= RIGHT CONTENT ================= */}
      <div className={`profile-content-area ${isMobile ? 'mobile-view' : ''}`}>
        
        {/* Profile Header */}
        <div className="profile-header">
          <h3>{t("myProfile")}</h3>
        </div>

        {/* Profile Content in Cards Layout */}
        <div className="profile-cards-container">
          
          {/* Photo Card */}
          <div className="profile-form-group">
            <h4>{t("profileImage")}</h4>
            <div className="profile-image-section">
              <img
                src={
                  userId
                    ? `http://localhost:2008/api/images/${userId}/profile`
                    : "/profile.png"
                }
                alt="User"
                onError={(e) => {
                  e.target.src = "/profile.png";
                }}
              />
              <input 
                type="file" 
                className="profile-form-input"
                onChange={(e) => setNewPhoto(e.target.files[0])} 
              />
              <button className="profile-btn-primary" onClick={handlePhotoChange}>
                {t("changePhoto")}
              </button>
            </div>
          </div>

          {/* Username Card */}
          <div className="profile-form-group">
            <h4>{t("username")}</h4>
            <label className="profile-form-label">{t("username")}:</label>
            <input
              type="text"
              className="profile-form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            <button className="profile-btn-success" onClick={handleProfileUpdate}>
              {t("updateUsername")}
            </button>
          </div>

          {/* Email Card */}
          <div className="profile-form-group">
            <h4>{t("email")}</h4>
            <label className="profile-form-label">{t("email")}:</label>
            <input 
              type="email" 
              className="profile-form-input" 
              value={email} 
              disabled 
              placeholder="Your email address"
            />
          </div>

          {/* Password Card */}
          {isManualLogin && (
            <div className="profile-form-group">
              <h4>{t("changePassword")}</h4>
              <label className="profile-form-label">{t("currentPassword")}:</label>
              <input
                type="password"
                className="profile-form-input"
                placeholder={t("currentPassword")}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              
              <label className="profile-form-label">{t("newPassword")}:</label>
              <input
                type="password"
                className="profile-form-input"
                placeholder={t("newPassword")}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              
              <button className="profile-btn-warning" onClick={handlePasswordChange}>
                {t("updatePassword")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;





