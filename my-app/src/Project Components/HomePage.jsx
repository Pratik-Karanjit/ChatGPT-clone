import React from 'react';
import paraicon from '../Project Images/Paragraph.png';
import summaryicon from '../Project Images/text.png';
import chaticon from '../Project Images/ChatBot.jpg';
import converticon from '../Project Images/Converter.png';
import imgicon from '../Project Images/Image.jpg';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  let navigate = useNavigate()

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-3 m-2 border border-light bg-success text-white text-center hover-effect rounded" onClick={() => {
          navigate('/summary')
        }}>
          <div className="d-flex flex-column align-items-center">
            <img src={summaryicon} alt="Image 1" width="80" height="80" />
            <b>Text Summary</b>
            <br></br>Summarize long texts into small sentences.
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-3 m-2 border border-light bg-success text-white text-center hover-effect rounded" onClick={() => {
          navigate('/paragraph')
        }}>
          <div className="d-flex flex-column align-items-center">
            <img src={paraicon} alt="Image 2" width="80" height="80" />
            <b>Paragraph</b>
            <br></br> Generate paragraphs with words.
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-3 m-2 border border-light bg-success text-white text-center hover-effect rounded"  onClick={() => {
          navigate('/chat')
        }}>
          <div className="d-flex flex-column align-items-center">
            <img src={chaticon} alt="Image 3" width="80" height="80" />
            <b>Chat bot</b>
            <br></br> Chat with AI ChatBot.
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-3 m-2 border border-light bg-success text-white text-center hover-effect rounded"  onClick={() => {
          navigate('/converter')
        }}>
          <div className="d-flex flex-column align-items-center">
            <img src={converticon} alt="Image 4" width="80" height="80" />
            <b>JS Converter</b>
            <br></br> Translate English into JavaScript Code.
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-3 m-2 border border-light bg-success text-white text-center hover-effect rounded" onClick={() => {
          navigate('/scifi')
        }}>
          <div className="d-flex flex-column align-items-center">
            <img src={imgicon} alt="Image 5" width="80" height="80" />
            <b>Sci Fi Image</b>
            <br></br> Generate Sci Fi Images.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
