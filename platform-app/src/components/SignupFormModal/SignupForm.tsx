import { useState } from "react";
import { useDispatch} from "react-redux";
import * as sessionActions from "../../store/session";

function SignupForm() {
  const dispatch:any = useDispatch();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Array<string>>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, password }))
        .catch(async (res:any) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>First Name</label>
        <input
        id='firstName'
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

      <label htmlFor='lastName'>Last Name</label>
        <input
          id='lastName'
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

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

      <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          id='confirmPassword'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
