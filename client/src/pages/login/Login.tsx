const Login = () => {
  return (
    <>
      <form action="">
        <div className="email-input">
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="password-input">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="login-button">
          <button>Login</button>
        </div>
      </form>
    </>
  );
};

export default Login;
