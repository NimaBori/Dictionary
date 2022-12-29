import { useEffect, useState } from "react";
import Results from "./Results";
import Pronunciation from "./Pronunciation";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { FaSearch } from "react-icons/fa";

function App() {
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  const [value, setValue] = useState("");
  const [word, setWord] = useState("");
  const [defs, setDefs] = useState([]);
  const [pronun, setPronun] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const findDefinition = () => {
    axios
      .get(url + word)
      .then((res) => {
        const { meanings, phonetics } = res.data[0];
        setDefs(() => meanings.filter((item) => item.definitions.length > 1));
        setPronun(phonetics);
        setIsPending(false);
        setError("");
        // console.log(res.data[0]);
        // console.log(phonetics);
        // console.log(meanings);
      })
      .catch((err) => {
        setError("There was a problem getting data. Please try again.");
        setIsPending(false);
        console.log(err);
      });
    setValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    setWord(value);
    findDefinition();
  };

  useEffect(() => {
    findDefinition();
  }, [word, url]);

  return (
    <Container className="main-container p-0">
      {/* search word */}
      <Container className="search-container mt-4 rounded bg-info bg-opacity-25 py-4">
        <h1 className="app-name">Dictionary App</h1>
        <div className="search-box shadow bg-light bg-opacity-10">
          <form onSubmit={(e) => handleSubmit(e)} className="search-input">
            <input
              placeholder="Type your English word here."
              autoFocus
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit">
              <FaSearch className="search-icon" />
            </button>
          </form>
        </div>
      </Container>

      {/* show word meaning  */}
      <Container className="mb-4 p-0">
        <Container className="px-0 pb-0 mb-0 bg-info bg-opacity-50 rounded">
          {word && isPending && (
            <div className="text-center d-flex-md-row p-3 ">
              <Spinner className="me-3 text-white" animation="grow" />
              <Spinner className="me-3 text-white" animation="grow" />
              <Spinner className=" text-white" animation="grow" />
            </div>
          )}
          {word && !isPending && error && (
            <div className="p-2 text-danger text-center fw-bold">
              No definition found. Please enter your word again.
            </div>
          )}
          {defs.length > 0 && !error && !isPending && (
            <Container className="rounded p-0">
              <h3 className="rounded text-center text-capitalize text-white bg-info bg-opacity-75 py-2 mb-0 def-title">
                {word}
              </h3>
              {defs.map((def, index) => (
                <Results key={index} {...def} {...pronun} />
              ))}
            </Container>
          )}
        </Container>

        {/* show word pronunciation  */}
        <Container className="px-0">
          {pronun && !error && !isPending && (
            <Container className="px-0 pb-3 pt-3 ps-3 bg-info bg-opacity-25 m-0 rounded">
              <h5 className="mb-3 fw-bold">Pronunciation</h5>
              {pronun.map((item, index) => (
                <Pronunciation key={index} {...item} />
              ))}
            </Container>
          )}
        </Container>
      </Container>
    </Container>
  );
}

export default App;
