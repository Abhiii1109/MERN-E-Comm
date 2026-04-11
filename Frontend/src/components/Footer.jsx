import { Link } from 'react-router-dom';

const SocialIcon = ({ d, label }) => (
  <a href="#" aria-label={label} className="w-9 h-9 border border-zinc-700 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:border-primary transition-colors">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
  </a>
);

const LINKS = {
  Shop: ['Men', 'Women', 'New Arrivals', 'Trending', 'Sale'],
  Categories: ['T-Shirts', 'Jeans', 'Dresses', 'Jackets', 'Hoodies'],
  Support: ['Help Center', 'Track Order', 'Returns', 'Size Guide', 'Contact Us'],
  Company: ['About Us', 'Careers', 'Blog', 'Press'],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      {/* Newsletter */}
      <div className="px-6 lg:px-16 py-12 border-b border-zinc-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black mb-1">Stay in the loop</h3>
            <p className="text-sm text-zinc-500">Get exclusive deals, new drops & style inspo delivered to your inbox.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-3 w-full md:w-auto">
            <input type="email" placeholder="Your email address" className="flex-1 md:w-72 bg-zinc-900 border border-zinc-800 rounded-full px-5 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary transition-colors" />
            <button type="submit" className="px-6 py-3 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary-dark transition-colors shrink-0">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 lg:px-16 py-14 grid grid-cols-2 md:grid-cols-6 gap-8">
        <div className="col-span-2">
          <Link to="/" className="text-2xl font-black tracking-tight block mb-4">LUXE</Link>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mb-5">
            Premium clothing for the modern generation. Bold designs, quality fabrics, prices that make you smile.
          </p>
          <div className="flex gap-2">
            <SocialIcon d="M2 2h20v20H2z M17.5 6.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3 M12 7a5 5 0 100 10 5 5 0 000-10" label="Instagram" />
            <SocialIcon d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" label="X" />
            <SocialIcon d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" label="Facebook" />
          </div>
        </div>
        {Object.entries(LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-4">{heading}</h4>
            <ul className="flex flex-col gap-2.5">
              {links.map((l) => <li key={l}><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="px-6 lg:px-16 py-5 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
        <p>© {new Date().getFullYear()} LUXE. All rights reserved.</p>
        <div className="flex gap-2">
          {['VISA', 'Mastercard', 'RuPay', 'UPI', 'COD'].map((p) => (
            <span key={p} className="px-2.5 py-1 border border-zinc-800 rounded text-[10px] font-semibold text-zinc-500">{p}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
