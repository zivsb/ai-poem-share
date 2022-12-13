import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import TestValidateButton from './TestValidateButton';
import CreatePost from './CreatePost';

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
      <br />
      <CreatePost />
    </div>
  );
}

export default App;
