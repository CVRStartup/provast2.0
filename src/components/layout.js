import Head from "next/head";
import { Navbar } from "./Layout/Navbar";

const Layout = (props) => (
  <>
    <Head>
      <title>Provast</title>
    </Head>
    <Navbar />
    <main>
      <div className=''>{props.children}</div>
    </main>
  </>
);

export default Layout;
