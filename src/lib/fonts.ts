import localFont from "next/font/local";
import { Source_Sans_3 } from "next/font/google";

export const monaSans = localFont({
  src: "../../public/fonts/MonaSansVF.woff2",
  variable: "--font-mona",
  display: "swap",
  weight: "400 900",
});

export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source",
  display: "swap",
});
