import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Add from "./component/add/Add";
import Get from "./component/get/Get";
import Updateitems from "./component/update/Updateitems";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/get" element={<Get />} />
          <Route path="/update/:id" element={<Updateitems />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
