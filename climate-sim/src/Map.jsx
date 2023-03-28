import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Popup,
  LayerGroup,
} from "react-leaflet";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import TimeSlider from "./TimeSlider";
import { getYearWithFractionalMonth, celciusToFernheit } from "./utils";

function Map() {
  const [tempData, setTempData] = useState([]);
  const [timeArray, setTimeArray] = useState([]);
  const [values, setValues] = useState([0]);
  const [dateString, setDateString] = useState("4/1/1880");
  const [station, setStation] = useState("");
  const [landTemp, setLandTemp] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    // const url =
    //   "https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-hourly&stations=72505394728,72534614701,72504694725,72533014709,72501694742,72497314766,72496094758,72495014780,72504794726,72502694735,72503094732,72505894720,72504594727,72502794734,72504094721,72501494747,72499314761,72501794744,72505094723,72503494730,72505594722,72503294733,72500094755,72504994724,72502294739&startDate=2022-01-01T00:00&endDate=2022-04-01T00:00&format=json&includeAttributes=true&includeStationName=true&units=metric&token=TAaMXcAFzebiyETzdCKAsPsefzoGYmqU";
    // axios
    //   .get(url, { responseType: "blob" })
    //   .then((response) => {
    //     // create a new blob object from the response data
    //     const file = new Blob([response.data], { type: "application/json" });

    //     // read the content of the blob object and parse the JSON data
    //     const reader = new FileReader();
    //     reader.onload = (event) => {
    //       const jsonData = JSON.parse(event.target.result);
    //       setData(jsonData);
    //     };
    //     reader.readAsText(file);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    axios
      .get("https://global-warming.org/api/temperature-api")
      .then((response) => {
        setTempData(response.data.result);
        setTimeArray(
          response.data.result.map(({ time }) => {
            const [year, month] = time.split(".");
            const decimalMonth = Number(month) - 1;
            const date = new Date(year, decimalMonth);
            return date;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const record = tempData.find(
      (temp) => temp.time === getYearWithFractionalMonth(dateString)
    );
    if (record) {
      setLandTemp(record.land);
      setStation(record.station);
    }
  }, [tempData, dateString]);
  return (
    <Container fluid style={{ height: "100vh", overflow: "hidden" }}>
      <Row style={{ height: "100%" }}>
        <Col sm={12}>
          <div
            className="d-flex flex-column h-100"
            style={{ position: "relative", height: "100%" }}
          >
            <MapContainer
              center={[51.505, -0.09]}
              zoom={3}
              scrollWheelZoom={true}
              className="h-100"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LayerGroup>
                <Circle center={[51.505, -0.09]} radius={2000}>
                  <Popup>
                    Example Circle Popup <br />
                    Latitude: 51.505 <br />
                    Longitude: -0.09
                  </Popup>
                </Circle>
              </LayerGroup>
            </MapContainer>
            <div
              style={{ zIndex: 500, position: "absolute", top: 100, left: 10 }}
            >
              <button className="btn btn-light m-2" onClick={toggleCollapse}>
                {collapsed ? (
                  <i className="fa fa-chevron-right" />
                ) : (
                  <i className="fa fa-chevron-left" />
                )}
              </button>
              {!collapsed && (
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    padding: 5,
                  }}
                >
                  <div className="m-3">
                    <p>
                      Global Temperature Anomaly:{" "}
                      <span
                        style={{
                          fontWeight: "bold",
                          color: station <= 0 ? "blue" : "red",
                        }}
                      >
                        {`${celciusToFernheit(station)} °F`}
                      </span>
                    </p>
                    <p>
                      Average Global Land Temperature:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {`${celciusToFernheit(landTemp)} °F`}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
            {timeArray.length > 0 && (
              <TimeSlider
                timeArray={timeArray}
                values={values}
                setValues={setValues}
                dateString={dateString}
                setDateString={setDateString}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
    //  <Container fluid style={{ height: "100vh", overflow: "hidden" }}>
    //   <Row style={{ height: "100%" }}>
    //     <Col sm={3}>
    //       <Sidebar
    //         sidebar={
    //           <Container>
    //             <Row>
    //               <Col>
    //                 <h2 className="text-center">Data</h2>
    //                 <p>
    //                   Global Temperature Anomaly:{" "}
    //                   <span
    //                     style={{
    //                       fontWeight: "bold",
    //                       color: station <= 0 ? "blue" : "red",
    //                     }}
    //                   >
    //                     {`${celciusToFernheit(station)} °F`}
    //                   </span>
    //                 </p>
    //                 <p>
    //                   Average Global Land Temperature:{" "}
    //                   <span
    //                     style={{ fontWeight: "bold" }}
    //                   >{`${celciusToFernheit(landTemp)} °F`}</span>
    //                 </p>
    //               </Col>
    //             </Row>
    //           </Container>
    //         }
    //         open={sidebarOpen}
    //         docked={sidebarDocked}
    //         onSetOpen={onSetOpen}
    //       >
    //         <div
    //           className="d-flex flex-column h-100"
    //           style={{ height: "100%" }}
    //         >
    //           <MapContainer
    //             center={[51.505, -0.09]}
    //             zoom={3}
    //             scrollWheelZoom={true}
    //             className="h-100"
    //           >
    //             <TileLayer
    //               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //             />
    //             <Pane style={{ zIndex: 500 }}>
    //               <div
    //                 style={{
    //                   position: "absolute",
    //                   top: 10,
    //                   left: 10,
    //                   backgroundColor: "white",
    //                   padding: 5,
    //                 }}
    //               >
    //                 <div className="m-5">
    //                   <p>
    //                     Global Temperature Anomaly:{" "}
    //                     <span
    //                       style={{
    //                         fontWeight: "bold",
    //                         color: station <= 0 ? "blue" : "red",
    //                       }}
    //                     >
    //                       {`${celciusToFernheit(station)} °F`}
    //                     </span>
    //                   </p>
    //                   <p>
    //                     Average Global Land Temperature:{" "}
    //                     <span
    //                       style={{ fontWeight: "bold" }}
    //                     >{`${celciusToFernheit(landTemp)} °F`}</span>
    //                   </p>
    //                 </div>
    //               </div>
    //             </Pane>
    //             <LayerGroup>
    //               <Circle center={[51.505, -0.09]} radius={2000}>
    //                 <Popup>
    //                   Example Circle Popup <br />
    //                   Latitude: 51.505 <br />
    //                   Longitude: -0.09
    //                 </Popup>
    //               </Circle>
    //             </LayerGroup>
    //           </MapContainer>
    //           {timeArray.length > 0 && (
    //             <TimeSlider
    //               timeArray={timeArray}
    //               values={values}
    //               setValues={setValues}
    //               dateString={dateString}
    //               setDateString={setDateString}
    //             />
    //           )}
    //         </div>
    //       </Sidebar>
    //     </Col>
    //   </Row>
    // </Container>
  );
}

export default Map;
