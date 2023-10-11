import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { Medic, Patient } from "@/src/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "@react-input/mask";
import { forwardRef } from "react";
import {
  Button,
  Modal as ModalBootstrap,
  FormSelect,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: (data: DiaryFormValues) => void;
  diary?: { horario: string; medico: string; paciente: Patient } | null;
  horarioAgen: string;
};

const formSchema = z.object({
  horario: z.string(),
  medico: z.string(),
  paciente: z.object({
    nome: z.string().min(1),
    cpf: z.string().min(1),
    data: z.string().min(8),
    endereco: z.string().min(1),
  }),
});

type DiaryFormValues = z.infer<typeof formSchema>;

const CustomInput = forwardRef<HTMLInputElement, { placeholder?: string }>(
  (props, forwardedRef) => {
    return <Form.Control type="text" ref={forwardedRef} {...props} />;
  }
);

export const Modal = ({
  isOpen,
  handleClose,
  diary,
  handleConfirm,
  horarioAgen,
}: ModalProps) => {
  const { medicosStorage } = useLocalStorage();
  const currentMedicos = JSON.parse(medicosStorage ?? "");

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: diary || {
      horario: "",
      medico: "",
      paciente: {
        cpf: "",
        data: "",
        endereco: "",
        nome: "",
      },
    },
  });

  const onSubmit = (data: DiaryFormValues) => {
    handleConfirm({
      horario: horarioAgen,
      medico: data.medico,
      paciente: data.paciente,
    });
  };

  console.log(diary);

  const onInvalid = () => {
    alert("Preencha todos os campos.");
  };

  const handleCurrentClose = () => {
    handleClose();
    methods.reset();
  };

  return (
    <ModalBootstrap show={isOpen} onHide={handleCurrentClose} centered>
      <ModalBootstrap.Header closeButton>
        <ModalBootstrap.Title>
          {diary ? "Editar agendamento" : "Criar agendamento"} às {horarioAgen}
        </ModalBootstrap.Title>
      </ModalBootstrap.Header>
      <ModalBootstrap.Body>
        <Form
          onSubmit={(event) => {
            methods.handleSubmit(onSubmit, onInvalid)(event);
          }}
        >
          <Controller
            control={methods.control}
            name="medico"
            render={({ field }) => (
              <Form.Group>
                <Form.Label className="m-0">Médico</Form.Label>
                <FormSelect placeholder="Selecione o medico" {...field}>
                  {currentMedicos
                    .filter((med: Medic) => med.disponivel)
                    .map((med: Medic, index: number) => (
                      <option value={index} key={index}>
                        {med.nome}
                      </option>
                    ))}
                </FormSelect>
              </Form.Group>
            )}
          />
          <Controller
            control={methods.control}
            name="paciente.nome"
            render={({ field }) => (
              <Form.Group>
                <Form.Label className="m-0">Nome do paciente</Form.Label>
                <Form.Control
                  placeholder="Insira o nome do paciente"
                  {...field}
                />
              </Form.Group>
            )}
          />
          <Controller
            control={methods.control}
            name="paciente.cpf"
            render={({ field }) => (
              <Form.Group>
                <Form.Label>CPF do paciente</Form.Label>
                <InputMask
                  component={CustomInput}
                  placeholder="Insira o CPF do paciente"
                  mask="___.___.___-__"
                  replacement={{ _: /\d/ }}
                  {...field}
                />
              </Form.Group>
            )}
          />
          <Controller
            control={methods.control}
            name="paciente.endereco"
            render={({ field }) => (
              <Form.Group>
                <Form.Label className="my-1">Endereço do paciente</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o endereço do paciente"
                  {...field}
                />
              </Form.Group>
            )}
          />
          <Controller
            control={methods.control}
            name="paciente.data"
            render={({ field }) => (
              <Form.Group>
                <Form.Label className="fs-6 my-1">
                  Data de nascimento do paciente
                </Form.Label>
                <InputMask
                  component={CustomInput}
                  placeholder="Insira a data de nascimento do paciente"
                  mask="__/__/____"
                  replacement={{ _: /\d/ }}
                  {...field}
                />
              </Form.Group>
            )}
          />
          <Row>
            <Col className="d-flex justify-content-end gap-2 mt-3">
              <Button
                variant="secondary"
                type="button"
                onClick={handleCurrentClose}
              >
                Fechar
              </Button>
              <Button variant="success" type="submit">
                {diary ? "Editar agendamento" : "Criar agendamento"}
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBootstrap.Body>
    </ModalBootstrap>
  );
};
