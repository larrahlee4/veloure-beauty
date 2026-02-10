import { motion } from 'framer-motion'

function MotionButton({ className = '', children, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default MotionButton
