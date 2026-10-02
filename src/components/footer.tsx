import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            CEID
            <span>
              Centre for Equity, Inclusion
              <br />
              and Development
            </span>
          </Link>
          <p>
            People. Evidence.
            <br />
            Inclusive change.
          </p>
          <span className="location">Dhaka, Bangladesh</span>
        </div>
        <div>
          <h3>Discover</h3>
          <Link href="/about">About CEID</Link>
          <Link href="/our-work">Our work</Link>
          <Link href="/research">Research</Link>
          <Link href="/people">Our people</Link>
        </div>
        <div>
          <h3>Take part</h3>
          <Link href="/learning">Learning & training</Link>
          <Link href="/events">Events & conversations</Link>
          <Link href="/opportunities">Opportunities</Link>
          <Link href="/contact">Collaborate with us</Link>
        </div>
        <div>
          <h3>Start a conversation</h3>
          <p>
            Ideas grow when we share them.
            <br />
            We’d love to hear yours.
          </p>
          <Link className="footer-email" href="mailto:info@ceidbd.com">
            info@ceidbd.com <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} CEID. All rights reserved.</span>
        <div>
          <Link href="/ethics">Research ethics</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/admin">Admin</Link>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
