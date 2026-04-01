import { motion } from "framer-motion";

const CTASection = () => (
  <section className="section-padding bg-foreground overflow-hidden">
    <div className="max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-background mb-4">
          Stay Updated with AI & Tech
        </h2>
        <p className="text-background/60 mb-8 max-w-md mx-auto">
          Follow Girona for daily tech insights, AI tutorials, and the latest trends — simplified.
        </p>
        <motion.a
          href="https://www.instagram.com/girona_.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Follow Girona
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
