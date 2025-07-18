import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { JsonEdit, UploadForm } from "../../components/JsonEdit";
export const Home = memo(() => {
  return <Container>
      <Row>
        <Col>
          <h1>JSON Field Editor</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <UploadForm />
        </Col>
        <Col>
          <JsonEdit />
        </Col>
      </Row>
          
    </Container>;
});
export default Home;