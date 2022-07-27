import Head from "next/head";
import Header from "./header";
import { Navbar } from "./Layout/Navbar";

const Layout = (props) => (
  <>
    <Head>
      <title>Provast</title>
    </Head>
    <Navbar />
    <main>
      <div className='container'>{props.children}</div>
    </main>
  </>
);

export default Layout;
