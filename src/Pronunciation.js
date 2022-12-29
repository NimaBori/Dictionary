import { Container } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Pronunciation = ({ text, audio }) => {
  return (
    <Container className="mb-2 py-0">
      {audio && (
        <div className="d-flex justify-content-start align-items-center">
          <h6 className="p-0 m-0 text-uppercase me-2">
            {audio.split(".mp3")[0].slice(-2)}
          </h6>
          <p className="m-0 me-4">{text}</p>
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={
              <Tooltip id="tooltip-right">Listen to pronunciation.</Tooltip>
            }
          >
            <button style={{ background: "transparent", border: "none" }}>
              <FaPlay
                className="play-icon"
                onClick={() => new Audio(audio).play()}
              />
            </button>
          </OverlayTrigger>

          {/* Two other approachs for audio element list below */}

          {/* <a target="_blank" type="audio" namhref={audio}>
            <FaPlay />
          </a> */}

          {/* <audio
            controls
            controlsList="nodownload, nofullscreen, noremoteplayback"
            src={audio}
          >
            <a href={audio}>
              <FaPlay />
            </a>
          </audio> */}
        </div>
      )}
    </Container>
  );
};

export default Pronunciation;
