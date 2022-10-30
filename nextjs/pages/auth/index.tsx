import { NextPage } from "next";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import FormEmail from "./FormEmail";
import FormForget from "./FormForget";
import FormLogin from "./FormLogin";

import FormRegister from "./FormRegister";
import FormReset from "./FormReset";


type ComponentPageType = {
  token: string
}

const ComponentPage: NextPage<ComponentPageType> = () => {

  const {currentForm} = useAuth();

    return (
        <main id="auth">
        <section>
        <Link href="/">
            <a>
                <img src="/images/ferrari-logo.svg" alt="Logo Ferrari" />
            </a>
         </Link>

        {currentForm === "email" && <FormEmail />}
        {currentForm === "login" && <FormLogin />}
        {currentForm === "register" && <FormRegister />}
        {currentForm === "forget" && <FormForget />}
        {currentForm === "reset" && <FormReset />}

          <p>2020 © Hcode. All rights reserved.</p>
        </section>
      </main>
    )
}


export default ComponentPage;

