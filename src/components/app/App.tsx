import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../main/main";
import PostScreen from "../postScreen/postScreen";


export default function App() {
  return(
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Main/>}/>  
        <Route path='posts'>
          <Route path={':id'} element={<PostScreen />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}