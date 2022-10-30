const FormLogin = () => {
    return(
        <form id="auth-login">
            <h1>Fazer login</h1>

            <hr />

            <div className="field">
              <input type="email" id="email-login"  />
              <label htmlFor="email-login">E-mail</label>
            </div>

            <div className="field">
              <input type="password" id="password" />
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