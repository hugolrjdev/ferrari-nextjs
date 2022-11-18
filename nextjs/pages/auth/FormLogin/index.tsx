import axios from "axios";
import { get } from "lodash";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Alert from "../../../components/Alert";

type FormData = {
  email: string;
  password:string;
  server?: string;
}

const FormLogin = () => {

  const router = useRouter();

  const {register, handleSubmit, formState: {errors}, setError, clearErrors, watch} = useForm<FormData>();

  const email = watch('email');
  const password = watch('password');

  const enviar = (data: FormData) => {
    axios.post(`api/auth/login`, data).then(({data})=>{
      // console.log(data)
      router.push('/');
    }).catch((err: any)=>setError('server', {
      message: err.response.data.message ?? err.message ?? 'Error Desconhecido'
    }));
  }

  useEffect(()=>{
    clearErrors();
  }, [email, password, clearErrors])

    return(
        <form id="auth-login" onSubmit={handleSubmit(enviar)}>
            <h1>Fazer login</h1>

            <hr />

            {errors && Object.keys(errors).length > 0 && <Alert type="danger">{Object.keys(errors).map((key, index) => <div key={index}>{get(errors, `${key}.message`)}&nbsp;</div>)}</Alert>}

            <div className="field">
              <input type="email" id="email-login" {...register('email',{required: 'E=mail é Obrigatório.'})} />
              <label htmlFor="email-login">E-mail</label>
            </div>

            <div className="field">
              <input type="password" id="password" {...register('password', {required: 'Password é obrigatório.'})} />
              <label htmlFor="password">Digite sua Senha</label>
            </div>

            <div className="actions">
              <div>
                <a href="#forget" className="link">Esqueceu sua senha?</a>
                <a href="#email" className="link">Este não é o seu e-mail?</a>
              </div>
              <button type="submit">Login</button>
            </div>
          </form>
    )
}

export default FormLogin;
