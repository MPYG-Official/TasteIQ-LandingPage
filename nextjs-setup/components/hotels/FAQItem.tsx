'use client';

import { useId, useState } from 'react';

type FAQItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export default function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className={`ht-faq-item${open ? ' is-open' : ''}`}>
      <h3 className="ht-faq-question">
        <button
          type="button"
          id={buttonId}
          className="ht-faq-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{question}</span>
          <span className="ht-faq-chevron" aria-hidden="true">
            {open ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="ht-faq-panel"
        hidden={!open}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}
