import { useEffect, useState } from 'react';

const MESSAGES = [
  'Complimentary worldwide shipping on orders above ₹25,000',
  'Made-to-measure appointments now open for the winter calendar',
  'Every piece ships in a hand-stitched muslin bag',
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 5200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="announcement" role="status" aria-live="polite">
      <div className="container">{MESSAGES[i]}</div>
    </div>
  );
}
