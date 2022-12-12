import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import TestValidateButton from './TestValidateButton';

function App() {
  return (
    <div className="App">
      <h1>My Social Media</h1>
      <LoginForm />
      <br></br>
      <br />
      <SignupForm />
      <br />
      <TestValidateButton />
    </div>
  );
}

export default App;
