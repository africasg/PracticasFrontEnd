import BarraNaveg from "./components/BarraNaveg";
import "./globals.css";

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        <BarraNaveg />
        {children}
      </body>
    </html>
  );
}