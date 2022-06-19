import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./App.css";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "10px",
        backgroundColor: "#222",
    },
};

function App() {
    const [metroStation, setMetroStation] = useState("");
    const [selectedLine, setSelectedLine] = useState(false);
    const [metroData, setMetroData] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [mertroInfo, setMetroInfo] = useState([]);
    const [metroUpdate, setMetroUpdate] = useState([]);
    const [selectedStationValue, setSelectedStationValue] = useState("");
    const [showDiv, setShowDiv] = useState(false);

    const api_key = process.env.REACT_APP_API_KEY;

    function openModal(e) {
        setIsOpen(true);
        setSelectedLine(e.currentTarget.id);
        const selectedMetroLine = e.currentTarget.id;
        setMetroStation(selectedMetroLine);
    }

    function afterOpenModal() {
        if (selectedLine === "Red") {
            document.getElementById("RedStations").style.display = "block";
        } else if (selectedLine === "Blue") {
            document.getElementById("BlueStations").style.display = "block";
        } else if (selectedLine === "Orange") {
            document.getElementById("OrangeStations").style.display = "block";
        } else if (selectedLine === "Green") {
            document.getElementById("GreenStations").style.display = "block";
        } else if (selectedLine === "Silver") {
            document.getElementById("SilverStations").style.display = "block";
        } else if (selectedLine === "Yellow") {
            document.getElementById("YellowStations").style.display = "block";
        }
    }

    function closeModal() {
        setIsOpen(false);
        setMetroData(false);
        setShowDiv(false);
    }

    useEffect(() => {
        if (modalIsOpen === true && metroData === true) {
            const interval = setInterval(() => {
                UpdateStationTimes();
                const updateTime = new Date();
                setMetroUpdate("Metro times updated at: " + updateTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }));
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [metroData]);

    const GetStationTimes = (e) => {
        const selectedMetroStation = e.currentTarget.value;
        const updateTime = new Date();
        setMetroUpdate("Metro times updated at: " + updateTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }));
        setSelectedStationValue(selectedMetroStation);
        console.log(selectedStationValue);
        setMetroData(true);
        setShowDiv(true);
        axios
            .get("https://api.wmata.com/StationPrediction.svc/json/GetPrediction/" + selectedMetroStation + "?api_key=" + api_key)
            .then((res) => {
                console.log(res.data.Trains);
                setMetroInfo(res.data.Trains);
            })
            .catch((error) => console.log(error));
    };

    const UpdateStationTimes = () => {
        axios
            .get("https://api.wmata.com/StationPrediction.svc/json/GetPrediction/" + selectedStationValue + "?api_key=" + api_key)
            .then((res) => {
                console.log(res.data.Trains);
                setMetroInfo(res.data.Trains);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="App">
            <div className="container">
                <div class="circle-container">
                    <a className="deg270">
                        <div className="rdLine trainLine fade1 " id="Red" onClick={openModal}></div>
                    </a>
                    <a className="deg335">
                        <div className="blLine trainLine fade2" id="Blue" onClick={openModal}></div>
                    </a>
                    <a className="deg30">
                        <div className="orLine trainLine fade3" id="Orange" onClick={openModal}></div>
                    </a>
                    <a className="deg90">
                        <div className="grLine trainLine fade4" id="Green" onClick={openModal}></div>
                    </a>
                    <a className="deg150">
                        <div className="svLine trainLine fade5" id="Silver" onClick={openModal}></div>
                    </a>
                    <a className="deg205">
                        <div className="ylLine trainLine fade6" id="Yellow" onClick={openModal}></div>
                    </a>
                </div>
                <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} shouldCloseOnOverlayClick={false} overlayClassName="overlay" style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
                    <button onClick={closeModal} className="closeButton">
                        X
                    </button>
                    <h2 className="stationTitle">{metroStation} Line Metro Stations</h2>

                    <div className="stationSelectHide" id="RedStations">
                        <select onChange={GetStationTimes} className="stationDropdown">
                            <option hidden disabled selected>
                                -- select a station --
                            </option>
                            <option value="A15">Shady Grove</option>
                            <option value="A14">Rockville</option>
                            <option value="A13">Twinbrook</option>
                            <option value="A12">White Flint</option>
                            <option value="A11">Grosvenor-Strathmore</option>
                            <option value="A10">Medical Center</option>
                            <option value="A09">Bethesda</option>
                            <option value="A08">Friendship Heights</option>
                            <option value="A07">Tenleytown-AU</option>
                            <option value="A06">Van Ness-UDC</option>
                            <option value="A05">Cleveland Park</option>
                            <option value="A04">Woodley Park-Zoo/Adams Morgan</option>
                            <option value="A03">Dupont Circle</option>
                            <option value="A02">Farragut North</option>
                            <option value="A01">Metro Center</option>
                            <option value="B01">Gallery Pl-Chinatown</option>
                            <option value="B02">Judiciary Square</option>
                            <option value="B03">Union Station</option>
                            <option value="B35">NoMa-Gallaudet U</option>
                            <option value="B04">Rhode Island Ave-Brentwood</option>
                            <option value="B05">Brookland-CUA</option>
                            <option value="B06">Fort Totten</option>
                            <option value="B07">Takoma</option>
                            <option value="B08">Silver Spring</option>
                            <option value="B09">Forest Glen</option>
                            <option value="B10">Wheaton</option>
                            <option value="B11">Glenmont</option>
                        </select>
                    </div>

                    <div className="stationSelectHide" id="BlueStations">
                        <select onChange={GetStationTimes} className="stationDropdown">
                            <option hidden disabled selected>
                                -- select a station --
                            </option>
                            <option value="J03">Franconia-Springfield</option>
                            <option value="J02">Van Dorn Street</option>
                            <option value="C13">King St-Old Town</option>
                            <option value="C12">Braddock Road</option>
                            <option value="C10">Ronald Reagan Washington National Airport</option>
                            <option value="C09">Crystal City</option>
                            <option value="C08">Pentagon City</option>
                            <option value="C07">Pentagon</option>
                            <option value="C06">Arlington Cemetery</option>
                            <option value="C05">Rosslyn</option>
                            <option value="C04">Foggy Bottom-GWU</option>
                            <option value="C03">Farragut West</option>
                            <option value="C02">McPherson Square</option>
                            <option value="C01">Metro Center</option>
                            <option value="D01">Federal Triangle</option>
                            <option value="D02">Smithsonian</option>
                            <option value="D03">L'Enfant Plaza</option>
                            <option value="D04">Federal Center SW</option>
                            <option value="D05">Capitol South</option>
                            <option value="D06">Eastern Market</option>
                            <option value="D07">Potomac Ave</option>
                            <option value="D08">Stadium-Armory</option>
                            <option value="G01">Benning Road</option>
                            <option value="G02">Capitol Heights</option>
                            <option value="G03">Addison Road-Seat Pleasant</option>
                            <option value="G04">Morgan Boulevard</option>
                            <option value="G05">Largo Town Center</option>
                        </select>
                    </div>
                    <div className="stationSelectHide" id="YellowStations">
                        <select onChange={GetStationTimes} className="stationDropdown">
                            <option hidden disabled selected>
                                -- select a station --
                            </option>
                            <option value="C15">Huntington</option>
                            <option value="C14">Eisenhower Avenue</option>
                            <option value="C13">King St-Old Town</option>
                            <option value="C12">Braddock Road</option>
                            <option value="C10">Ronald Reagan Washington National Airport</option>
                            <option value="C09">Crystal City</option>
                            <option value="C08">Pentagon City</option>
                            <option value="C07">Pentagon</option>
                            <option value="D03">L'Enfant Plaza</option>
                            <option value="F02">Archives-Navy Memorial-Penn Quarter</option>
                            <option value="F01">Gallery Pl-Chinatown</option>
                            <option value="E01">Mt Vernon Sq 7th St-Convention Center</option>
                            <option value="E02">Shaw-Howard U</option>
                            <option value="E03">U Street/African-Amer Civil War Memorial/Cardozo</option>
                            <option value="E04">Columbia Heights</option>
                            <option value="E05">Georgia Ave-Petworth</option>
                            <option value="E06">Fort Totten</option>
                        </select>
                    </div>

                    <div className="stationSelectHide" id="OrangeStations">
                        <select onChange={GetStationTimes} className="stationDropdown">
                            <option hidden disabled selected>
                                -- select a station --
                            </option>
                            <option value="D09">Minnesota Ave</option>
                            <option value="D10">Deanwood</option>
                            <option value="D11">Cheverly</option>
                            <option value="D12">Landover</option>
                            <option value="D13">New Carrollton</option>
                            <option value="K01">Court House</option>
                            <option value="K02">Clarendon</option>
                            <option value="K03">Virginia Square-GMU</option>
                            <option value="K04">Ballston-MU</option>
                            <option value="K05">East Falls Church</option>
                            <option value="K06">West Falls Church-VT/UVA</option>
                            <option value="K07">Dunn Loring-Merrifield</option>
                            <option value="K08">Vienna/Fairfax-GMU</option>
                        </select>
                    </div>

                    <div className="stationSelectHide" id="GreenStations">
                        <select onChange={GetStationTimes} className="stationDropdown">
                            <option hidden disabled selected>
                                -- select a station --
                            </option>
                            <option value="E01">Mt Vernon Sq 7th St-Convention Center</option>
                            <option value="E02">Shaw-Howard U</option>
                            <option value="E03">U Street/African-Amer Civil War Memorial/Cardozo</option>
                            <option value="E04">Columbia Heights</option>
                            <option value="E05">Georgia Ave-Petworth</option>
                            <option value="E06">Fort Totten</option>
                            <option value="E07">West Hyattsville</option>
                            <option value="E08">Prince George's Plaza</option>
                            <option value="E09">College Park-U of Md</option>
                            <option value="E10">Greenbelt</option>
                            <option value="F01">Gallery Pl-Chinatown</option>
                            <option value="F02">Archives-Navy Memorial-Penn Quarter</option>
                            <option value="F03">L'Enfant Plaza</option>
                            <option value="F04">Waterfront</option>
                            <option value="F05">Navy Yard-Ballpark</option>
                            <option value="F06">Anacostia</option>
                            <option value="F07">Congress Heights</option>
                            <option value="F08">Southern Avenue</option>
                            <option value="F09">Naylor Road</option>
                            <option value="F10">Suitland</option>
                            <option value="F11">Branch Ave</option>
                        </select>
                    </div>

                    <div className="stationSelectHide" id="SilverStations">
                        <select onChange={GetStationTimes} className="stationDropdown">
                            <option hidden disabled selected>
                                -- select a station --
                            </option>
                            <option value="N01">McLean</option>
                            <option value="N02">Tysons Corner</option>
                            <option value="N03">Greensboro</option>
                            <option value="N04">Spring Hill</option>
                            <option value="N06">Wiehle-Reston East</option>
                        </select>
                    </div>

                    {showDiv ? (
                        <div>
                            {mertroInfo.map((post) => {
                                const minutes = post.Min;
                                const destination = post.DestinationName;

                                return (
                                    <div className="stationTime">
                                        <p>{destination}</p>
                                        <p>{minutes}</p>
                                    </div>
                                );
                            })}
                            <p className="timeUpdate">{metroUpdate}</p>
                        </div>
                    ) : null}
                </Modal>
            </div>
        </div>
    );
}

export default App;
