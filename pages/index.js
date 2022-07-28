// import { useUser } from "../src/lib/hooks";
import Layout from "../src/components/layout";
import Iron from "@hapi/iron";
import axios from "axios";
import { getLoginSession } from "../src/lib/auth";
import { findUser } from "../src/lib/user";
const Home = ({ user }) => {
  return (
    <Layout>
      <h1>Passport.js Example</h1>

      <p>Steps to test the example:</p>

      <ol>
        <li>Click Login and enter a username and password.</li>
        <li>
          You'll be redirected to Home. Click on Profile, notice how your session is being used
          through a token stored in a cookie.
        </li>
        <li>Click Logout and try to go to Profile again. You'll get redirected to Login.</li>
      </ol>

      {user && (
        <>
          <p>Currently logged in as:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps = async function ({ req, res }) {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  if (!user.detailsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }
  if (!user.academicsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Home;
