import { useState } from "react";

import { useAuth } from "../../features/auth/hooks.js";

export default function LoginForm() {

    const { signIn, loading } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        await signIn({

            email,

            password

        });

    }

    return (

        <form onSubmit={handleSubmit}>

            <h2>HEMAP RMS</h2>

            <input

                type="email"

                placeholder="Email"

                value={email}

                onChange={(e) =>

                    setEmail(e.target.value)

                }

            />

            <input

                type="password"

                placeholder="Password"

                value={password}

                onChange={(e) =>

                    setPassword(e.target.value)

                }

            />

            <button disabled={loading}>

                Login

            </button>

        </form>

    );

}