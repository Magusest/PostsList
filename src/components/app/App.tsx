import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../main/mainScreen";
import PostScreen from "../postScreen/postScreen";
import { AppRoutes } from "../../utils/const";


export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path={`${AppRoutes.main}`} element={<Main/>}/>  
        <Route path={`${AppRoutes.post}`}>
          <Route path={':id'} element={<PostScreen />}/>
        </Route>
        <Route path={AppRoutes.unfounded} element={<h1>404 Page Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}