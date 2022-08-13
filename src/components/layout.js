import Head from "next/head";
import { Footer } from "./Layout/Footer";
import { Navbar } from "./Layout/Navbar";

const Layout = (props) => (
  <>
    <Head>
      <title>Provast</title>
    </Head>
    <Navbar />
    <main className='min-h-screen'>
      <div>{props.children}</div>
    </main>
    <Footer />
  </>
);

export default Layout;
