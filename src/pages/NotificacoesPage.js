import { Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../api/api";

function NotificacoesPage() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      const response = await api.get("/log/my-logs");
      setLogs(response.data);
      setIsLoading(false);
    }

    fetchLogs();
  }, []);

  console.log(logs);

  return (
    <Container className="mt-5">
      {!isLoading &&
        logs
          .map((log) => {
            let date = new Date(log.date);
            let hh = date.getHours();
            let mm = date.getMinutes();
            return (
              <Card className="my-2">
                <Card.Body>
                  {log.status} - Data: {log.date.slice(0, 10)} Hora: {hh}:{mm}
                </Card.Body>
              </Card>
            );
          })
          .reverse()}
    </Container>
  );
}

export default NotificacoesPage;
