import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const AboutSection = () => {
  const points = [
    "AI news & breakthroughs — explained clearly",
    "Tools, trends & products you can use today",
    "Practical insights for every level of AI literacy",
  ];

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const { data } = await supabase.from("site_settings").select("value").eq("key", "aboutVideoUrl").single();
      if (data && data.value) {
        setVideoUrl(data.value);
      }
    };
    fetchVideo();
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);

      // Request fullscreen
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
    }
  };

  return (
    <section id="about" className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-semibold text-sm mb-2 flex items-center gap-2">
            <span className="w-6 h-[2px] bg-primary inline-block" aria-hidden="true" /> Public Education Campaign
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            About <span className="text-primary">Girona AI</span>
          </h2>
        </motion.div>

        <div className={`grid grid-cols-1 ${videoUrl ? 'lg:grid-cols-2 gap-8 lg:gap-12 items-center' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`bg-background rounded-2xl p-8 md:p-12 card-shadow flex flex-col justify-center ${videoUrl ? 'max-w-none' : 'max-w-3xl'}`}
          >
            <p className="text-foreground text-lg sm:text-xl font-bold mb-4">
              Where AI meets technology — explained for everyone.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Girona AI is the public education campaign of Oyik AI — a UK-based AI automation company. We close the gap
              between complex AI technology and the everyday people it affects.
            </p>
            <p className="text-foreground font-semibold mb-4">We share:</p>
            <motion.ul
              className="space-y-3 mb-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {points.map((p) => (
                <motion.li key={p} variants={item} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                  <span>{p}</span>
                </motion.li>
              ))}
            </motion.ul>
            <p className="text-muted-foreground font-medium italic leading-relaxed mb-8">
              No jargon. No hype. Just the developments that matter, made accessible.
            </p>
            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity text-sm shadow-md"
              >
                Learn More About Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {videoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative w-full aspect-[4/3] max-h-[450px] bg-black rounded-2xl overflow-hidden card-shadow group"
            >
              <video
                ref={videoRef}
                src={videoUrl}
                preload="metadata"
                controls={isPlaying}
                className="w-full h-full object-cover"
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              />
              {!isPlaying && (
                <div 
                  className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer transition-colors hover:bg-black/40 backdrop-blur-[1px]"
                  onClick={handlePlayClick}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/95 text-primary-foreground rounded-full flex items-center justify-center pl-1 shadow-2xl transform transition-transform group-hover:scale-110">
                    <Play size={36} fill="currentColor" />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
