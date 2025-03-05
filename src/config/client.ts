interface ClientConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  twitter: string;
  themeColor: string;
  backgroundColor: string;
}

const clients: Record<string, ClientConfig> = {
  ethertech: {
    name: "EtherTech",
    shortName: "EtherTech",
    description: "Scan and identify products instantly with EtherTech's advanced barcode scanning technology. Get detailed product information at your fingertips.",
    url: "https://scanner.ethertech.io",
    twitter: "@ethertech",
    themeColor: "#059669", // emerald-600
    backgroundColor: "#065f46", // emerald-800
  },
  neoshift: {
    name: "Neoshift",
    shortName: "Neoshift",
    description: "Experience seamless product identification with Neoshift's smart barcode scanner. Access comprehensive product details instantly.",
    url: "https://scanner.neoshift.tech",
    twitter: "@neoshift",
    themeColor: "#059669", // emerald-600
    backgroundColor: "#065f46", // emerald-800
  }
};

const clientName = process.env.NEXT_PUBLIC_CLIENT || 'ethertech';
export const clientConfig = clients[clientName]; 