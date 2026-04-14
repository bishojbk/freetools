export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
};

export type Category = {
  name: string;
  description: string;
  icon: string;
};

export const categories: Category[] = [
  { name: "Text Tools", description: "Transform and analyze text", icon: "Type" },
  { name: "Developer Tools", description: "Utilities for developers", icon: "Code2" },
  { name: "CSS & Design", description: "Visual design helpers", icon: "Palette" },
  { name: "Generators", description: "Generate passwords, QR codes & more", icon: "Sparkles" },
  { name: "Converters & Calculators", description: "Convert units and calculate", icon: "ArrowLeftRight" },
];

export const tools: Tool[] = [
  { slug: "word-counter", name: "Word Counter", description: "Count words, characters, sentences, and paragraphs", category: "Text Tools", icon: "FileText" },
  { slug: "case-converter", name: "Case Converter", description: "Convert text between different cases", category: "Text Tools", icon: "CaseSensitive" },
  { slug: "lorem-ipsum", name: "Lorem Ipsum", description: "Generate placeholder text", category: "Text Tools", icon: "AlignLeft" },
  { slug: "find-replace", name: "Find & Replace", description: "Find and replace text with regex support", category: "Text Tools", icon: "Replace" },
  { slug: "json-formatter", name: "JSON Formatter", description: "Format, validate, and minify JSON", category: "Developer Tools", icon: "Braces" },
  { slug: "base64", name: "Base64 Encode/Decode", description: "Encode or decode Base64 strings", category: "Developer Tools", icon: "Binary" },
  { slug: "hash-generator", name: "Hash Generator", description: "Generate SHA-256, SHA-1, and SHA-512 hashes", category: "Developer Tools", icon: "Fingerprint" },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate random UUIDs (v4)", category: "Developer Tools", icon: "Hash" },
  { slug: "url-encode", name: "URL Encode/Decode", description: "Encode or decode URL components", category: "Developer Tools", icon: "Link" },
  { slug: "color-converter", name: "Color Converter", description: "Convert between HEX, RGB, and HSL", category: "CSS & Design", icon: "Pipette" },
  { slug: "gradient-generator", name: "Gradient Generator", description: "Create CSS gradients visually", category: "CSS & Design", icon: "Blend" },
  { slug: "box-shadow", name: "Box Shadow", description: "Generate CSS box-shadow values", category: "CSS & Design", icon: "Square" },
  { slug: "password-generator", name: "Password Generator", description: "Generate secure random passwords", category: "Generators", icon: "KeyRound" },
  { slug: "qr-generator", name: "QR Code Generator", description: "Generate QR codes from text or URLs", category: "Generators", icon: "QrCode" },
  { slug: "unit-converter", name: "Unit Converter", description: "Convert between common units", category: "Converters & Calculators", icon: "Ruler" },
  { slug: "timestamp-converter", name: "Timestamp Converter", description: "Convert Unix timestamps to dates and back", category: "Converters & Calculators", icon: "Clock" },
  { slug: "percentage-calculator", name: "Percentage Calculator", description: "Calculate percentages easily", category: "Converters & Calculators", icon: "Percent" },
  { slug: "tip-calculator", name: "Tip Calculator", description: "Calculate tip and split the bill", category: "Converters & Calculators", icon: "Receipt" },
];

export function getToolsByCategory(categoryName: string): Tool[] {
  return tools.filter((t) => t.category === categoryName);
}
