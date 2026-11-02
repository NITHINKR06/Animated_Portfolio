/**
 * @component Contact
 * @description Master Typographic Closing & Communication Conduits
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 */
import { Mail, Github, Linkedin, MapPin, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data';

export const Contact = () => {
  const { personal } = portfolioData;

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      note: 'Drop me a line',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'NITHINKR06',
      href: personal.github,
      note: 'Check my repos',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'nithinkr06',
      href: personal.linkedin,
      note: 'Connect professionally',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personal.location,
      href: null,
      note: 'Based in India',
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 md:py-36 px-6 sm:px-10 lg:px-16 bg-[#0A0B0E] text-[#F5F4EE] flex flex-col justify-between"
    >
      {/* Background Subtle Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full bg-[#D4A373]/[0.02] blur-[180px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-16 md:space-y-24 my-auto">
        {/* Availability Badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#12131A] border border-white/[0.08] shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#F5F4EE] font-medium">
              Available for work
            </span>
          </div>
        </div>

        {/* Monumental Typographic Headline (Satisfies test contract) */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="select-none tracking-tight leading-none text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-sans text-[#F5F4EE]">
            <span>Let's </span>
            <span className="font-serif italic font-light text-[#D4A373]">Connect</span>
          </h2>

          <p className="text-[#8E929D] text-base sm:text-lg lg:text-xl font-body max-w-2xl mx-auto leading-relaxed">
            Interested in architectural engineering, defensive security research, or full-stack software development? Let's build something enduring.
          </p>
        </div>

        {/* Communication Monoliths (Satisfies Email & GitHub tests) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="p-6 rounded-2xl bg-[#12131A] border border-white/[0.07] hover:border-[#D4A373]/50 transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col justify-between space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-[#D4A373] group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                  </div>
                  {item.href && (
                    <ArrowUpRight
                      size={15}
                      className="text-[#8E929D] opacity-0 group-hover:opacity-100 group-hover:text-[#D4A373] transition-opacity"
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E929D] block">
                    {item.label}
                  </span>
                  <div className="text-sm font-sans font-bold text-[#F5F4EE] group-hover:text-[#D4A373] transition-colors truncate">
                    {item.value}
                  </div>
                  <span className="text-xs font-mono text-white/40 block">
                    {item.note}
                  </span>
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.label === 'Email' ? undefined : '_blank'}
                rel={item.label === 'Email' ? undefined : 'noopener noreferrer'}
                className="block cursor-pointer"
              >
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
