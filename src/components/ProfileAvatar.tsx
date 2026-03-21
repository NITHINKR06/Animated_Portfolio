import { motion } from 'framer-motion';

export const ProfileAvatar = () => {
  return (
    <motion.svg
      viewBox="0 0 160 160"
      className="w-40 h-40 sm:w-48 sm:h-48"
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="avatar-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#22c1c3" />
        </linearGradient>
        <linearGradient id="avatar-shirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Outer glow ring */}
      <circle cx="80" cy="80" r="76" fill="#020617" />
      <circle cx="80" cy="80" r="72" fill="url(#avatar-bg)" opacity="0.9" />
      <circle cx="80" cy="80" r="62" fill="#020617" />

      {/* Shoulders / suit shape */}
      <path
        d="M32 126c6-20 24-34 48-34s42 14 48 34v10H32z"
        fill="url(#avatar-shirt)"
      />
      {/* Shirt */}
      <path
        d="M64 98l16 22 16-22c-4-4-10-6-16-6s-12 2-16 6z"
        fill="#e5e7eb"
      />
      {/* Tie / center accent */}
      <path d="M76 104h8l4 18-8 10-8-10z" fill="#4f46e5" />

      {/* Face */}
      <circle cx="80" cy="70" r="24" fill="#fed7aa" />

      {/* Hair simplified */}
      <path
        d="M56 72c0-14 8-26 24-26 10 0 18 4 22 12-1-12-9-22-24-22-18 0-28 10-28 26 0 4 1 8 2 10z"
        fill="#020617"
      />

      {/* Simple facial features */}
      <circle cx="72" cy="70" r="2" fill="#0f172a" />
      <circle cx="88" cy="70" r="2" fill="#0f172a" />
      <path d="M72 80c2 3 5 4 8 4s6-1 8-4" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" fill="none" />

      {/* Subtle highlight arc */}
      <path
        d="M40 100c8-18 24-28 40-28s32 10 40 28"
        stroke="#22c1c3"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
        fill="none"
      />
    </motion.svg>
  );
};
