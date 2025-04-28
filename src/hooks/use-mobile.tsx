
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Initialize state to a default (e.g., false) - consistent for SSR and initial client render
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  // State to track if the component has mounted
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true); // Mark as mounted after the first render

    const checkDevice = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Initial check
    checkDevice();

    // Listener for window resize
    window.addEventListener('resize', checkDevice);

    // Cleanup listener
    return () => {
        window.removeEventListener('resize', checkDevice);
    };
  }, []) // Empty dependency array means this runs once on mount

  // Return the determined value only after mounting to avoid hydration mismatch
  // Return default (false) during SSR and the initial client render pass.
  return hasMounted ? isMobile : false;
}
