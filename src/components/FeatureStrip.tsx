import { motion } from "framer-motion";

const tags = ["Tech News", "AI Tools", "Tutorials", "Trends", "Tech News", "AI Tools", "Tutorials", "Trends"];

const FeatureStrip = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5 }}
      className="bg-foreground py-4 overflow-hidden"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...tags, ...tags].map((tag, i) => (
          <span key={i} className="flex items-center gap-6 mx-6 text-background text-sm font-medium">
            {tag}
            <span className="text-primary" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </motion.section>
  );
};

export default FeatureStrip;
