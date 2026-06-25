export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="grid gap-4 md:grid-cols-4">
          
          <div>
            <h3 className="font-bold">
              Simplyfiy Toy Store
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              Toys that inspire imagination,
              creativity and learning.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Categories
            </h4>

            <ul className="mt-3 space-y-2 text-sm">
              <li>Toys</li>
              <li>Board Games</li>
              <li>Metal Cars</li>
              <li>RC Cars</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">
              Support
            </h4>

            <ul className="mt-3 space-y-2 text-sm">
              <li>Contact Us</li>
              <li>Shipping Policy</li>
              <li>Returns</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">
              Legal
            </h4>

            <ul className="mt-3 space-y-2 text-sm">
              <li>Terms</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Simplyfiy Toy Store
        </div>
      </div>
    </footer>
  );
}