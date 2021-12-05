import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";


function LoginForm() {
  const dispatch:any = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password })).catch(
      async (res: any) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (

    <form onSubmit={handleSubmit}>
     <h1>Log In</h1>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label htmlFor='email'>Email</label>
        <input
          id='email'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

      <label htmlFor='password'>Password</label>
        <input
          id='password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
