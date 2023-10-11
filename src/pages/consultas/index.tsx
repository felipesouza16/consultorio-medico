import { DataTable } from "@/src/components/data-table";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { Appointment, Columns, Diary } from "@/src/types/types";
import { formatter } from "@/src/utils/formatter";
import { Col, Container, Row } from "react-bootstrap";

export const Consultas = () => {
  const { agendamentosStorage } = useLocalStorage();

  const currentAgendamentosStorage = JSON.parse(agendamentosStorage || "");

  const columns: Columns[] = [
    { key: "nomePaciente", name: "Nome Paciente" },
    { key: "nomeMedico", name: "Nome Médico" },
    { key: "medicoEspecializacao", name: "Especialização Médico" },
    { key: "valor", name: "Valor" },
  ];

  const data: Appointment[] = currentAgendamentosStorage
    .filter((agen: Diary) => agen.medico && agen.paciente)
    .map((agen: Diary) => ({
      nomePaciente: agen.paciente?.nome,
      nomeMedico: agen.medico?.nome,
      medicoEspecializacao: agen.medico?.especializacao,
      valor: formatter.format(Math.random() * 1000),
    }));

  return (
    <Container>
      <Col>
        <Row>
          <DataTable columns={columns} data={data} />
        </Row>
      </Col>
    </Container>
  );
};
