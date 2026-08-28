import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cream-line bg-cream-soft">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <span className="font-script text-2xl text-rose-dark">Aliza&apos;s Thread House</span>
          <p className="mt-2 max-w-xs text-sm text-ink-soft">
            The art of thread. Unique embroidery art &amp; cozy crochet
            creations, made by hand to order.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-ink">Shop</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>
              <Link href="/shop" className="hover:text-rose-dark">
                All products
              </Link>
            </li>
            <li>
              <Link href="/custom-order" className="hover:text-rose-dark">
                Request a custom piece
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-rose-dark">
                Customer reviews
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-rose-dark">
                Our story
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-ink">Find us</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>
              <a
                href="https://www.instagram.com/_alizas.thread.house_/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-dark"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61581774740153"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-dark"
              >
                Facebook
              </a>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-rose-dark">
                Shop owner login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-line py-4 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} Aliza&apos;s Thread House. Made with 🧵 &amp; 🧶.
      </div>
    </footer>
  );
}
