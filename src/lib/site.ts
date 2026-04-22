export const site = {
  name: "Xeroura Technologies",
  legalName: "Xeroura Technologies Private Limited",
  tagline: "Humanising Intelligence, Powered by AI",
  email: "Connect@Xeroura.com",
  address: {
    lines: [
      "Xeroura Technologies Pvt Ltd",
      "Awfis N Heights, Level 6, Plot No 38, Phase 2",
      "HITEC City, Siddiq Nagar",
      "Hyderabad, Telangana 500081",
    ],
    lat: 17.451441,
    lng: 78.371071,
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;
