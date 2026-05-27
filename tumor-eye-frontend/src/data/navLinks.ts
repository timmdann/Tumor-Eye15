export const NAV_LINKS = [
  { label: "About Us", path: "/about" },
  { label: "Terms of Service", path: "/terms" },
  { label: "FAQ", path: "/faq" },
  { label: "Profile", path: "/profile" },
] as const;

export const ABOUT_NAV_LINKS = [
  { label: "Terms of Service", to: "/terms" },
  { label: "FAQ", to: "/faq" },
  { label: "Profile", to: "/profile" },
];

export const FAQ_NAV_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Profile", to: "/profile" },
];
