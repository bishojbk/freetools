# FreeTools

Free online tools that run entirely in your browser. No signup, no tracking, no ads. Your data never leaves your device.

**Live:** [Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/bishojbk/freetools) in one click.

## Tools

### Text Tools
- **Word Counter** — Count words, characters, sentences, and paragraphs
- **Case Converter** — UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case
- **Lorem Ipsum** — Generate placeholder paragraphs
- **Find & Replace** — Search and replace with regex support

### Developer Tools
- **JSON Formatter** — Format, validate, and minify JSON
- **Base64 Encode/Decode** — Encode and decode Base64 strings (Unicode safe)
- **Hash Generator** — SHA-1, SHA-256, SHA-384, SHA-512 via Web Crypto API
- **UUID Generator** — Generate random v4 UUIDs
- **URL Encode/Decode** — Encode and decode URL components

### CSS & Design
- **Color Converter** — Convert between HEX, RGB, and HSL
- **Gradient Generator** — Create linear and radial CSS gradients visually
- **Box Shadow** — Generate CSS box-shadow with live preview

### Generators
- **Password Generator** — Cryptographically secure passwords with strength meter
- **QR Code Generator** — Generate and download QR codes as PNG

### Converters & Calculators
- **Unit Converter** — Length, weight, and temperature conversions
- **Timestamp Converter** — Unix timestamps to ISO dates and back
- **Percentage Calculator** — Three calculation modes (X% of Y, A is what % of B, % change)
- **Tip Calculator** — Calculate tip and split the bill

## Stack

- **Next.js 16** with App Router
- **Tailwind CSS v4**
- **TypeScript**
- **Lucide React** for icons
- **qrcode** for QR generation

All tools use browser-native APIs (Web Crypto, Canvas, TextEncoder) with zero server calls. The only runtime dependency beyond React/Next is `qrcode`.

## Run Locally

```bash
git clone https://github.com/bishojbk/freetools.git
cd freetools
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Works out of the box on Vercel:

```bash
npm run build
```

Or deploy anywhere that supports Node.js. Since all pages are statically generated, you can also export to pure HTML/CSS/JS.

## Add a New Tool

1. Create `src/app/tools/your-tool/page.tsx` with `"use client"` directive
2. Wrap content in the `<ToolLayout>` component
3. Add the tool entry to `src/lib/tools.ts` (slug, name, description, category, icon)
4. Pick an icon from [Lucide](https://lucide.dev/icons) and add it to the icon map in `page.tsx`

## License

MIT
