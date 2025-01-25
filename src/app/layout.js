import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import AuthContextProvider from "../../context/authContext";
import ProductContextProvider from "../../context/productContext";
import SessionContextProvider from "../../context/sessionContext";


const inter = Inter({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "MidvertHub",
  description: "MidvertHub is a platform for buying and selling digital products",
};

export default async function RootLayout({ children }) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <SessionContextProvider session={session ? session : null}>
        <AuthContextProvider session={session ? session : null}>
          <ProductContextProvider>
            <html lang="en">
              <body className={`${inter.className}`}>
                <Header />
                <div className="margin-b">
                  {children}
                </div>

                <Footer />

              </body>
            </html>

          </ProductContextProvider>
        </AuthContextProvider>
      </SessionContextProvider>
    </SessionProvider>
  );
}
