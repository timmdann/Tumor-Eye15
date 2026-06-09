export const NAV_LINKS = [
  { label: "About Us", path: "/about" },
  { label: "Terms of Service", path: "/terms" },
  { label: "FAQ", path: "/faq" },
] as const;

export const ABOUT_NAV_LINKS = [
  { label: "Terms of Service", to: "/terms" },
  { label: "FAQ", to: "/faq" },
];

export const FAQ_NAV_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Terms of Service", to: "/terms" },
];

export const TERMS_NAV_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "FAQ", to: "/faq" },
];
