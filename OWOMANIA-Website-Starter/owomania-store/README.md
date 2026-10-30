# OWOMANIA Store — starter release

Premium responsive fashion storefront for OWOMANIA. Includes a sample product collection, search/category filtering, product details, local cart, checkout form, server-side order creation, COD order endpoint, Razorpay Checkout and signature verification.

## Important before launch
- This is a launch-ready **starter**, not a finished merchant account. Replace all sample products/photos/prices and contact details.
- The demo cart is stored in the visitor's browser. The checkout validates product IDs, sizes, quantities and prices against a server-side sample catalogue in `netlify/functions/catalog.js`. Keep that file in sync when editing the sample catalogue in `app.js`.
- COD is included as a technical option. Keep it disabled in the UI unless you can fulfil and collect COD orders.
- No admin dashboard or customer order-history login is included in this first release. Orders are stored privately in Supabase and can be viewed in the Supabase dashboard.
- Add your legal business name, customer support details, shipping/return policy, privacy policy, terms, GST/invoice details as applicable before accepting orders.

## 1. Supabase database
1. Create a free project at https://supabase.com.
2. Open SQL Editor and run `schema.sql`.
3. In Project Settings > API, copy Project URL and `service_role` key. Keep the service-role key secret; never put it in `app.js` or HTML.

## 2. Razorpay test account
1. Create/activate your merchant account at https://razorpay.com.
2. In test mode, generate a Key ID and Key Secret.
3. Use test keys first. Complete KYC and enable live payments only when Razorpay approves your account.

## 3. Deploy free on Netlify
1. Create a GitHub account and a new repository; upload the contents of this folder.
2. Sign in at https://netlify.com and choose Add new site > Import an existing project.
3. Connect the GitHub repository. Build command can be left blank; publish directory is `.`.
4. In Site configuration > Environment variables, add the four values from `.env.example`.
5. Trigger a deploy. Netlify installs `package.json` dependencies and publishes the functions.
6. Open the Netlify URL and test the storefront. Test Razorpay checkout using test mode only.

## 4. Before live payments
- Add live Razorpay keys only after merchant KYC/activation.
- Add and verify a Razorpay webhook for payment events; this starter verifies checkout signatures but does not implement webhook reconciliation/refunds.
- Before launch, add stock checks, delivery/shipping rules, taxes, order notifications, admin authentication and policies. The server-side catalogue is a small hard-coded starter, not an inventory management system.
- Replace WhatsApp placeholder `91XXXXXXXXXX` in `app.js` with your business WhatsApp number (country code + number, digits only).
- Replace `hello@owomania.in` with your real support email.

## Files
- `index.html`, `styles.css`, `app.js`: responsive storefront
- `netlify/functions/`: server-side order/payment endpoints
- `schema.sql`: Supabase orders table
- `.env.example`: required deployment secrets (example only)
