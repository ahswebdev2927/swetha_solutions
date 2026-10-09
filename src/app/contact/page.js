"use client";

import GlobalFooter from "../components/GlobalFooter";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "../components/Header";

// Crisp Inline SVG Logo Component
function Logo({ className = "", light = false }) {
  return (
    <img
      src="/swetha_solutions_logo.png"
      alt="Swetha Solutions"
      className={`nav-logo-img ${className}`}
      style={{
        height: "42px",
        width: "auto",
        objectFit: "contain",
        display: "block"
      }}
    />
  );
}

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Subscription State
  const [subEmail, setSubEmail] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (typeof window !== "undefined") {
        localStorage.setItem("ahs_contact_form_draft", JSON.stringify(updated));
        if (["name", "email", "phone"].includes(field)) {
          const savedLead = localStorage.getItem("ahs_lead_info");
          const leadData = savedLead ? JSON.parse(savedLead) : {};
          leadData[field] = value;
          localStorage.setItem("ahs_lead_info", JSON.stringify(leadData));
        }
      }
      return updated;
    });
  };






  // Form submit handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.message) return;
    
    setFormSubmitting(true);
    setFormError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setFormSubmitted(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("ahs_lead_info", JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }));
        localStorage.removeItem("ahs_contact_form_draft");
      }
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Subscription submit handler
  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (!subEmail.trim()) return;
    setSubSuccess(true);
    setSubEmail("");
    setTimeout(() => {
      setSubSuccess(false);
    }, 5000);
  };

  // Custom FAQs
  const faqs = [
    {
      q: "What are your standard business hours in Hyderabad?",
      a: "Our standard office hours are Monday through Saturday, from 9:30 AM to 6:30 PM (IST). However, our digital support agents are available for critical queries online.",
    },
    {
      q: "How long does it take for Swetha Solutions to respond to a project inquiry?",
      a: "We value your time! Our consultants typically review and respond to all email or form submissions within 2-4 business hours, providing a detailed response or scheduling a discovery call.",
    },
    {
      q: "Can I schedule a face-to-face consultation at your Punjagutta office?",
      a: "Yes, absolutely! We welcome our clients to visit our headquarters at Riviera Apartments, Punjagutta for in-person discussions. Please call us or send an email ahead to schedule a slot so we can ensure the appropriate technical lead is present.",
    },
    {
      q: "Do you offer free cost estimates or project proposals?",
      a: "Yes! We provide complete, customized digital strategies and itemized project quotes at absolutely zero cost. After our initial discovery call, our analysts will prepare a proposal outlining recommended frameworks, design layouts, and schedules.",
    },
    {
      q: "What is your primary method of communication during project execution?",
      a: "We believe in complete transparency. We set up dedicated communication channels via Slack or WhatsApp groups, and coordinate weekly milestone reviews through Zoom or Google Meet. Clients are also assigned a dedicated Account Manager.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header & Navigation Bar */}
      <Header activePage="contact" />

      {/* 2. Contact Hero Section */}
      <section className="page-hero">
        <div 
          className="page-hero-bg" 
          style={{ backgroundImage: "url('/images/hero/video-production.png')" }}
        />
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content container animate-slide-in">
          <h1>Contact <span>Swetha Solutions</span></h1>
          <p>
            Have a project idea or looking to accelerate your digital growth? Get in touch with our tech consultants. We design custom high-performance web, app, and marketing solutions.
          </p>
        </div>
      </section>

      {/* 3. Call, Location & Email Cards — White Background, no extra spacing */}
      <section className="contact-channels-section">
        <div className="container">
          <div className="contact-channels-grid" style={{ marginTop: 0 }}>

            {/* Phone Channel Card */}
            <div className="channel-card">
              <a href="tel:7673935353" className="w-full flex flex-col items-center">
                <div className="channel-icon-wrapper" title="Click to call">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3 className="channel-title">Call Us Today</h3>
                <p className="channel-desc">Talk directly to our experts to get quick consultations and quotes.</p>
                <span className="channel-link">76739 35353</span>
              </a>
            </div>

            {/* Location Channel Card */}
            <div className="channel-card">
              <a
                href="https://www.google.com/maps/place/Swetha+Hi+Solutions/@17.4236443,78.449918,17z/data=!4m6!3m5!1s0x3bcb9183fd7f0d1b:0x33152b32540e8bdc!8m2!3d17.4236782!4d78.4528612!16s%2Fg%2F11ms3900cz?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-col items-center"
              >
                <div className="channel-icon-wrapper" title="Open Google Maps">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="channel-title">Visit Our Headquarters</h3>
                <p className="channel-desc">Flat No. 502, Riviera Apartments, Dwarakapuri, Punjagutta, Hyderabad, Telangana 500082</p>
                <span className="channel-link">Open Google Maps</span>
              </a>
            </div>

            {/* Email Channel Card */}
            <div className="channel-card">
              <a href="mailto:info@swethasolutions.com" className="w-full flex flex-col items-center">
                <div className="channel-icon-wrapper" title="Compose Email">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className="channel-title">Email Us Anytime</h3>
                <p className="channel-desc">Send us your technical designs, requirements sheets, or business inquiries.</p>
                <span className="channel-link">info@swethasolutions.com</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Send Us a Message — White Background */}
      <section id="contact-form" className="contact-form-section">
        <div className="container">
          <div className="contact-form-container">
            {!formSubmitted ? (
              <>
                <div className="contact-form-title">
                  <h2>Send Us a Message</h2>
                  <p>Provide your details below, and one of our dedicated digital analysts will review your query immediately.</p>
                </div>
                <form onSubmit={handleFormSubmit}>
                  <div className="contact-form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contactName">Your Name *</label>
                      <input
                        id="contactName"
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contactPhone">Phone Number *</label>
                      <input
                        id="contactPhone"
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        className="form-input"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="form-group form-group-full">
                      <label className="form-label" htmlFor="contactEmail">Email Address *</label>
                      <input
                        id="contactEmail"
                        type="email"
                        required
                        placeholder="e.g. name@company.com"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                    <div className="form-group form-group-full">
                      <label className="form-label" htmlFor="contactMessage">Your Message *</label>
                      <textarea
                        id="contactMessage"
                        required
                        placeholder="Tell us about your project, technology requirements, or business goals..."
                        className="form-textarea"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                      />
                    </div>
                  </div>
                  {formError && (
                    <div style={{ color: "#ef4444", marginTop: "20px", marginBottom: "10px", fontSize: "14px", fontWeight: "600", textAlign: "center" }}>
                      ⚠️ {formError}
                    </div>
                  )}
                  <button type="submit" className="form-submit-btn" disabled={formSubmitting}>
                    {formSubmitting ? "Sending Message..." : "Send Message"}
                  </button>
                </form>
              </>
            ) : (
              <div className="form-success-overlay">
                <div className="success-icon-badge">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you, <strong>{formData.name}</strong>. Your message has been received. Our digital consultants will analyze your request and contact you at <strong>{formData.email}</strong> shortly.</p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", phone: "", email: "", message: "" });
                  }}
                  className="btn btn-outline"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section — Grey Background */}
      <section className="section section-bg-alt">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Here are quick and transparent answers to the most common questions regarding project timelines, support, and consultation.</p>
          </div>
          <div className="faq-container">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${idx === activeFaq ? "active" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setActiveFaq(idx === activeFaq ? -1 : idx)}
                >
                  <span>{faq.q}</span>
                  <span className="faq-toggle-icon">+</span>
                </button>
                <div
                  className="faq-answer"
                  style={{ maxHeight: idx === activeFaq ? "250px" : "0" }}
                >
                  <div className="faq-answer-content">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Subscribe to Us — Grey Background */}
      <section className="subscribe-section">
        <div className="container">
          <div className="subscribe-card">
            <div className="subscribe-content">
              <div className="subscribe-text">
                <h3>Subscribe To Us</h3>
                <p>Stay updated on custom industry tech insights, design patterns, search algorithm updates, and agency announcements!</p>
              </div>
              <div className="subscribe-form-wrapper">
                <form onSubmit={handleSubscribeSubmit} className="subscribe-form">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="subscribe-input"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                  />
                  <button type="submit" className="subscribe-btn">Subscribe</button>
                </form>
                {subSuccess && (
                  <div className="subscribe-success">
                    ✓ Thank you! You&apos;ve successfully subscribed to our newsletter.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 7. Footer */}
      <GlobalFooter />


    </div>
  );
}
