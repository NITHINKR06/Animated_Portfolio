import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, MapPin, X } from "lucide-react";
import { portfolioData } from "../data/portfolio";

const Certification = () => {
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const certifications = [...portfolioData.certifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section id="certifications" className="py-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header - Apply Scroll-Triggered Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full mb-6">
            <Award size={20} className="text-cyan-400" />
            <span className="text-cyan-300 font-medium">
              Achievements & Certifications
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Click any card to view full details and certificate image.
          </motion.p>
        </motion.div>

        {/* Cards grid - Apply Staggered Entry Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer relative rounded-2xl border border-white/10
                         bg-white/5 backdrop-blur-md overflow-hidden
                         transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {cert.title}
                </h3>
                <p className="text-cyan-300 text-sm mb-4">{cert.issuer}</p>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-blue-400" />
                    <span>{cert.date}</span>
                  </div>
                  {cert.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-cyan-400" />
                      <span>{cert.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal uses the same updated color scheme */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-3xl mx-4 rounded-2xl overflow-hidden border border-white/10 bg-slate-900/95">
              {/* Close button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="p-8 space-y-6 overflow-y-auto max-h-[90vh]">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {selectedCert.title}
                  </h3>
                  <p className="text-cyan-300 text-lg mb-4">
                    {selectedCert.issuer}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-blue-400" />
                      <span>{selectedCert.date}</span>
                    </div>
                    {selectedCert.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-cyan-400" />
                        <span>{selectedCert.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Certificate Image */}
                {selectedCert.image && (
                  <div className="rounded-xl overflow-hidden border border-white/10 shadow-md shadow-cyan-500/10">
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="w-full object-contain"
                    />
                  </div>
                )}

                {/* Description */}
                <div className="space-y-3">
                  {selectedCert.description.map((desc: string, i: number) => (
                    <p
                      key={i}
                      className="text-gray-300 leading-relaxed text-sm md:text-base"
                    >
                      {desc}
                    </p>
                  ))}
                </div>

                {/* Skills */}
                {selectedCert.skills && (
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">
                      Skills Gained
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-lg border border-white/10 bg-gradient-to-r from-slate-700 to-slate-600 text-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certification;
