// Core
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import { Header } from "../components/Header";

// Others
import Providers from "./Providers";
import Router from "./Router";
import { Footer } from "components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Providers>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Header />
        <Router />
        <Footer />
      </Providers>
    </BrowserRouter>
  );
};

export default App;
