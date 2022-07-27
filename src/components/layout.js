import Head from "next/head";
import Header from "./header";
import { Navbar } from "./Layout/Navbar";

const Layout = (props) => (
  <>
    <Head>
      <title>Provast</title>
    </Head>
    <Navbar />
    <main className='mt-[10vh]'>
      <div className='container'>{props.children}</div>
    </main>
  </>
);

export default Layout;
