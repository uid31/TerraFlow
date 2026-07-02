"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { loginAction, LoginState } from "./actions";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button style={{ width: "100%", marginTop: 10 }} type="submit" disabled={pending}>
      {pending ? "Signing in…" : "Sign In"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="glass">
          <span className="badge">🌿 TerraFlow</span>
          <h1>Welcome back</h1>
          <p style={{ marginTop: 10 }}>
            Sign in to view live soil conditions and manage your irrigation system.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="glass">
          <h2 style={{ marginBottom: 6 }}>Sign in</h2>
          <p style={{ marginBottom: 6, fontSize: 14 }}>Enter your details to continue.</p>

          <form action={formAction}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" placeholder="e.g. fieldmanager01" />

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" />

            <p id="msg">{state.error}</p>

            <SubmitButton />
          </form>

          <Link href="/register">
            <button className="ghost" style={{ width: "100%", marginTop: 10 }}>
              Create an account
            </button>
          </Link>
          <Link href="/">
            <button className="ghost" style={{ width: "100%", marginTop: 10 }}>
              Back to home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
