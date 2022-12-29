import { Container } from "react-bootstrap";

const Results = ({ partOfSpeech, definitions }) => {
  return (
    <Container className="border-0 py-0 m-0 ">
      <h4 className="pt-3 mb-2 fw-bold">Part of Speech</h4>
      <h6 className="mb-3 ps-2 text-capitalize fst-italic">{partOfSpeech}</h6>
      <h5 className="mt-3 mb-2 fw-bold">Definition</h5>
      <ul className="mb-0 pb-2">
        {definitions.map((def, index) => (
          <li key={index}>{def.definition}</li>
        ))}
      </ul>
      <div className="border-bottom mt-2 line"></div>
    </Container>
  );
};

export default Results;
