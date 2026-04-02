import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

const FAQSection = ({ 
  faqs, 
  title = "Frequently Asked Questions", 
  subtitle = "Have questions? We've got answers to help you understand our mission and content better." 
}: FAQSectionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0 || faqs.every(f => !f.question)) return null;

  return (
    <section className="section-padding bg-background w-full">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold text-sm mb-2 flex items-center justify-center gap-2">
            <span className="w-6 h-[2px] bg-primary" aria-hidden="true" /> Support & Info
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            if (!faq.question || !faq.answer) return null;
            const isOpen = activeIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`border border-border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "bg-secondary ring-1 ring-primary/20" : "bg-secondary/30 hover:bg-secondary/50"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-semibold text-foreground text-base sm:text-lg pr-8">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary shrink-0"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground text-sm sm:text-base leading-relaxed border-t border-border/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
