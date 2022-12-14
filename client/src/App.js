import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import TestValidateButton from './TestValidateButton';
import CreatePost from './CreatePost';
import Topbar from './Topbar';
import Posts from './Posts';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Topbar />
      <Routes>
        <Route path="/" element={<Posts />}></Route>
        <Route path="/enteraccount" element={<div><LoginForm /> <hr /> <SignupForm/></div>}></Route>
        <Route path="/createpost" element={<CreatePost/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
