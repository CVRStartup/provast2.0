import { useState } from "react";
import Router from "next/router";
import { useUser } from "../../src/lib/hooks";
import Layout from "../../src/components/layout";
import Form from "../../src/components/form";
import Image from "next/image";

const Login = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />;
};

export default Login;
