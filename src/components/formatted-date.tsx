
"use client";

import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { enIN } from 'date-fns/locale'; // Use Indian English locale for formatting consistency

type FormattedDateProps = {
  dateString: string; // Expecting ISO 8601 or compatible string like 'YYYY-MM-DD'
  formatStyle?: string; // e.g., 'PPP' (like Jul 26, 2024), 'dd/MM/yyyy'
};

export function FormattedDate({ dateString, formatStyle = 'PPP' }: FormattedDateProps) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && dateString) {
      try {
        // Parse the date string. Assume ISO format or YYYY-MM-DD which parseISO handles.
        const date = parseISO(dateString);
        // Format the date only after the component has mounted on the client
        setFormattedDate(format(date, formatStyle, { locale: enIN }));
      } catch (error) {
        console.error("Error parsing date:", dateString, error);
        // Fallback or display the original string if parsing fails
        setFormattedDate(dateString);
      }
    }
  }, [dateString, formatStyle, isMounted]);

  // Render placeholder or null during SSR and initial client render
  if (!isMounted || formattedDate === null) {
    // Render a placeholder that matches the expected height/style if necessary
    // or simply return null if placeholder isn't needed.
    // Using the original string might be okay if it's a simple format like YYYY-MM-DD
    // return dateString;
     return null; // Return null to avoid rendering potentially mismatching content initially
  }

  return <>{formattedDate}</>;
}
