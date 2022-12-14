import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import TestValidateButton from './TestValidateButton';
import CreatePost from './CreatePost';
import Topbar from './Topbar';
import Posts from './Posts';

function App() {
  return (
    <div className="App">
      <Topbar />
      <h1>My Social Media</h1>
      <LoginForm />
      <br></br>
      <br />
      <SignupForm />
      <br />
      <TestValidateButton />
      <br />
      <CreatePost />
      <br />
      <Posts />
    </div>
  );
}

export default App;
