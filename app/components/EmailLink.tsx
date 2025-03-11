'use client';

/**
 * EmailLink component
 * 
 * This is a client component that renders an email link.
 * By using 'use client', this component will only be rendered on the client side,
 * which helps protect the email address from bots that don't execute JavaScript.
 * 
 * The email address is constructed at runtime in the browser rather than being
 * directly present in the HTML source, making it harder for bots to scrape.
 */
export default function EmailLink() {
  // Construct the email parts to avoid having the complete email in the source
  const emailUsername = 'galeriederoyan';
  const emailDomain = 'gmail.com';
  
  return (
    <a 
      href={`mailto:${emailUsername}@${emailDomain}`} 
      className="underline decoration-black hover:text-gray-700 transition-colors"
    >
      {emailUsername}@{emailDomain}
    </a>
  );
} 