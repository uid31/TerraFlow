"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { registerAction, RegisterState } from "./actions";

const initialState: RegisterState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button style={{ width: "100%", marginTop: 10 }} type="submit" disabled={pending}>
      {pending ? "Creating…" : "Create Account"}
    </button>
  );
}

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerAction, initialState);

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="glass">
          <span className="badge">🌿 TerraFlow</span>
          <h1>Join TerraFlow</h1>
          <p style={{ marginTop: 10 }}>
            Create an account to set up your soil profile and start monitoring live conditions.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="glass">
          <h2 style={{ marginBottom: 6 }}>Create account</h2>
          <p style={{ marginBottom: 6, fontSize: 14 }}>Choose a username and password.</p>

          <form action={formAction}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" placeholder="e.g. fieldmanager02" />

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" />

            <label htmlFor="confirm">Confirm password</label>
            <input id="confirm" name="confirm" type="password" placeholder="••••••••" />

            <p id="msg">{state.error}</p>

            <SubmitButton />
          </form>

          <Link href="/login">
            <button className="ghost" style={{ width: "100%", marginTop: 10 }}>
              Back to sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
