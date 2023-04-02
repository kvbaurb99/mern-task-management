import Board from "./components/pages/Board";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App flex">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Board />} />
          <Route path='/:id' element={<Board />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
