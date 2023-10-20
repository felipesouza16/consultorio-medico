import { DataTable } from "@/src/components/data-table";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { Appointment, Columns, Diary } from "@/src/types/types";
import { formatter } from "@/src/utils/formatter";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  Modal,
  Row,
} from "react-bootstrap";

export const Consultas = () => {
  const [open, setOpen] = useState(false);
  const [valor, setValor] = useState(0);
  const { agendamentosStorage } = useLocalStorage();

  const currentAgendamentosStorage = JSON.parse(agendamentosStorage || "");

  const columns: Columns[] = [
    { key: "data", name: "Data" },
    { key: "horario", name: "Horário" },
    { key: "nomePaciente", name: "Nome Paciente" },
    { key: "nomeMedico", name: "Nome Médico" },
    { key: "medicoEspecializacao", name: "Especialização Médico" },
    { key: "valor", name: "Valor" },
    { key: "actions", name: "\n" },
  ];

  const data: Appointment[] = currentAgendamentosStorage
    .filter((agen: Diary) => agen.medico && agen.paciente)
    .map((agen: Diary) => ({
      horario: agen.horario,
      data: new Date(agen.data).toLocaleDateString(),
      nomePaciente: agen.paciente?.nome,
      nomeMedico: agen.medico?.nome,
      medicoEspecializacao: agen.medico?.especializacao,
      valor: formatter.format(Math.random() * 1000),
    }));

  return (
    <>
      <Modal show={open} onHide={() => setOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Alterar o valor da consulta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            value={valor}
            onChange={(event) => setValor(Number(event.target.value))}
          />
          <Modal.Footer>
            <Button onClick={() => {}}>Salvar</Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <Container>
        <Col>
          <Row>
            <DataTable
              columns={columns}
              data={data}
              onClickAction={() => setOpen(true)}
            />
          </Row>
        </Col>
      </Container>
    </>
  );
};
