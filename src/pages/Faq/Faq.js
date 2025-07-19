import React, { useState } from 'react';
import './Faq.css';

const faqData = [
  {
    question: 'What are your opening hours?',
    answer: 'We are open Monday to Saturday from 6:00 AM to 9:00 PM, and Sunday from 7:00 AM to 8:00 PM.'
  },
  {
    question: 'Do you offer custom cakes?',
    answer: 'Yes! We offer custom cakes for all occasions. Please place your order at least 48 hours in advance for custom designs.'
  },
  {
    question: 'Do you have gluten-free options?',
    answer: 'Absolutely! We have a variety of gluten-free baked goods including cakes, cookies, and pastries. Please ask our staff for availability.'
  },
  {
    question: 'Can I place orders online?',
    answer: 'Currently, we accept orders via phone or in-store. Online ordering is coming soon!'
  },
  {
    question: 'Do you offer catering services?',
    answer: 'Yes, we provide catering services for events of all sizes. Contact us for a custom quote and menu options.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, credit cards, debit cards, and mobile payments including Apple Pay and Google Pay.'
  },
  {
    question: 'Are your ingredients locally sourced?',
    answer: 'We prioritize using locally sourced ingredients whenever possible and only use real butter, cream, and unbleached flour.'
  },
  {
    question: 'Do you offer delivery?',
    answer: 'Yes, we offer delivery within a 5-mile radius. Delivery fees apply based on distance.'
  },
  {
    question: 'Can I freeze your baked goods?',
    answer: 'Most of our products can be frozen for up to 30 days. We recommend wrapping them properly to maintain freshness.'
  },
  {
    question: 'Do you have vegan options?',
    answer: 'Yes, we offer several vegan options including cakes, cookies, and pastries made without any animal products.'
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-root">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <p className="faq-subtitle">Find answers to common questions about our products and services</p>
      <div className="faq-list">
        {faqData.map((item, idx) => (
          <div className={`faq-item${openIndex === idx ? ' open' : ''}`} key={idx}>
            <button className="faq-question" onClick={() => toggleAccordion(idx)}>
              {item.question}
              <span className="faq-arrow">{openIndex === idx ? '▲' : '▼'}</span>
            </button>
            <div className="faq-answer" style={{ display: openIndex === idx ? 'block' : 'none' }}>
              {item.answer}
            </div>
          </div>
        ))}
      </div>
      <div className="faq-contact-box">
        <h2 className="faq-contact-title">Still Have Questions?</h2>
        <p className="faq-contact-desc">Can't find what you're looking for? Our friendly staff is here to help!</p>
        <div className="faq-contact-btns">
          <a href="tel:5551234567" className="faq-btn call">Call Us: (555) 123-4567</a>
          <a href="mailto:info@bakerzbite.com" className="faq-btn email">Email: info@bakerzbite.com</a>
        </div>
      </div>
    </section>
  );
};

export default Faq;
