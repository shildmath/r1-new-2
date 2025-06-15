
export type NavbarItem = {
  name: string;
  path: string;
};

export type NavbarConfig = {
  brand: string;
  navItems: NavbarItem[];
};

const KEY = "main_navbar_config";

const DEFAULT_CONFIG: NavbarConfig = {
  brand: "AIAdMaxify",
  navItems: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Services', path: '/#services' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login/Sign Up', path: '/auth' }
  ]
};

export function getNavbarConfig(): NavbarConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
    return DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function setNavbarConfig(cfg: NavbarConfig) {
  localStorage.setItem(KEY, JSON.stringify(cfg));
}
