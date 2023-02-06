import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu.jsx";
import Navbar from "./components/Navbar.jsx";
import { darkTheme, lightTheme } from "./utils/Theme.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Video from "./pages/Video.jsx";
import SignIn from "./pages/SignIn.jsx";

const Container = styled.div`
  display: flex; /* horizontal*/
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) =>
    theme.bg}; // VERSTEH ICH NICHT WO THEME HERKOMMT!
`;

const Wrapper = styled.div`
  padding: 22px 80px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscribtions" element={<Home type="sub" />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
