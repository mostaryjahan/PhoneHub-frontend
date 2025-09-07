import { motion, AnimatePresence } from "framer-motion";

const ResponsiveMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20"
        >
          <button onClick={() => setOpen(false)}>Close Menu</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
