import SignupForm from './LoginRegister/SignupForm';
import LoginForm from './LoginRegister/LoginForm';
import CreatePost from './CreatePost/CreatePost';
import Topbar from './Topbar';
import Posts from './Posts';
import { Route, Routes } from 'react-router-dom';
import ViewSingle from './Posts/ViewSingle';

function App() {
  return (
    <div className="App">
      <Topbar />
      <Routes>
        <Route path="/" element={<Posts />}></Route>
        <Route path="/enteraccount/" element={<div><LoginForm /> <hr /> <SignupForm/></div>}></Route>
        <Route path="/createpost/" element={<CreatePost/>}></Route>
        <Route path="/post/" element={<ViewSingle/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
