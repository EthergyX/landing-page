// src/components/form/PageHeader.tsx
import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  highlight?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title,
  subtitle,
  highlight
}) => {
  // Split the title to highlight a specific word if provided
  let titleParts: string[] = [];
  let highlightedWord = "";

  if (highlight && title.includes(highlight)) {
    titleParts = title.split(highlight);
    highlightedWord = highlight;
  } else {
    titleParts = [title];
  }
    
  return (
    <div className="text-center mb-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold mb-2"
      >
        {titleParts[0]}
        {highlightedWord && <span className="text-blue-400">{highlightedWord}</span>}
        {titleParts.length > 1 && titleParts[1]}
      </motion.h1>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-blue-100"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default PageHeader;