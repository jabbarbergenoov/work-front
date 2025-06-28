"use client";

import { useLoadingStore } from "@/lib/loading-store";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingProgress() {
    const isLoading = useLoadingStore((state) => state.isLoading);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 z-[9999]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                />
            )}
        </AnimatePresence>
    );
}
