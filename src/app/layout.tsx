// import './globals.css'
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Header />
        <Container style={{ minHeight: "calc(100vh - 106px)" }}>
          {children}
        </Container>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
