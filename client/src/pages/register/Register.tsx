const Register = () => {
  return (
    <>
    <form action="">
      <div className="email-input">
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" />
      </div>
      <div className="username-input">
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" />
      </div>
      <div className="password-input">
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" />
      </div>
      <div className="confirm-password-input">
        <label htmlFor="confirm-password">Confirm password: </label>
        <input type="password" name="confirm-password" id="confirm-password" />
      </div>
      <div className="register-button">
        <button>Register</button>
      </div>
    </form>
  </>
  );
};

export default Register;
