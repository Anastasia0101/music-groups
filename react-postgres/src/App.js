import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modal'
import DataTable from './Components/DataTable'
// import { CSVLink } from "react-csv"

function App() {

  const [songs, setSongs] = useState(false);
  useEffect(() => {
    getSongs();
  }, []);
  function getSongs() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setSongs(data);
      });
  }
  
  return (
    <Container className="App">
    <Row>
      <Col>
        <h1 style={{margin: "20px 0"}}>CRUD Database</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <DataTable data={this.state.data} />
      </Col>
    </Row>
  </Container>
  );
}
export default App;