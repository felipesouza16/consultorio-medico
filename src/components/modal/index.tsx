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
import { useForm, Controller, FormProvider } from "react-hook-form";
import * as z from "zod";

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: (data: DiaryFormValues) => void;
  initialData?: { horario: string; medico: string; paciente: Patient } | null;
  horarioAgen: string;
};

const formSchema = z.object({
  horario: z.string(),
  medico: z.string(),
  paciente: z.object({
    nome: z.string().min(1),
    cpf: z.string().min(1),
    data: z.string().min(1),
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
  initialData,
  handleConfirm,
  horarioAgen,
}: ModalProps) => {
  const { medicosStorage } = useLocalStorage();
  const currentMedicos = JSON.parse(medicosStorage ?? "");

  const methods = useForm<DiaryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      horario: "",
      medico: "",
      paciente: {
        nome: "",
        cpf: "",
        data: "",
        endereco: "",
      },
    },
  });

  const onSubmit = (data: DiaryFormValues) => {
    handleConfirm({
      horario: horarioAgen,
      medico:
        data.medico.length > 1
          ? currentMedicos.find((med: Medic) => med.nome === data.medico)?.id
          : data.medico,
      paciente: data.paciente,
    });
  };

  const onInvalid = () => {
    alert("Preencha todos os campos.");
  };

  const handleCurrentClose = () => {
    handleClose();
  };

  const handleShow = () => {
    initialData
      ? methods.reset(
          initialData || {
            horario: "",
            medico: "",
            paciente: {
              nome: "",
              cpf: "",
              data: "",
              endereco: "",
            },
          }
        )
      : methods.reset({
          horario: "",
          medico: "",
          paciente: {
            nome: "",
            cpf: "",
            data: "",
            endereco: "",
          },
        });
  };

  return (
    <ModalBootstrap
      show={isOpen}
      onHide={handleCurrentClose}
      centered
      onShow={handleShow}
    >
      <ModalBootstrap.Header closeButton>
        <ModalBootstrap.Title>
          {initialData ? "Editar agendamento" : "Criar agendamento"} às{" "}
          {horarioAgen}
        </ModalBootstrap.Title>
      </ModalBootstrap.Header>
      <ModalBootstrap.Body>
        <FormProvider {...methods}>
          <Form
            onSubmit={(event) => {
              methods.handleSubmit(onSubmit, onInvalid)(event);
            }}
          >
            <Controller
              control={methods.control}
              name="medico"
              render={({ field }) => {
                const defaultValue = currentMedicos.find(
                  (med: Medic) => med.nome === field.value
                )?.id;
                return (
                  <Form.Group>
                    <Form.Label className="m-0">Médico</Form.Label>
                    <FormSelect
                      placeholder="Selecione o medico"
                      {...field}
                      value={defaultValue}
                      onChange={field.onChange}
                    >
                      {currentMedicos
                        .filter((med: Medic) => med.disponivel)
                        .map((med: Medic, index: number) => (
                          <option value={med.id} key={index}>
                            {med.nome}
                          </option>
                        ))}
                    </FormSelect>
                  </Form.Group>
                );
              }}
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
                  {initialData ? "Editar agendamento" : "Criar agendamento"}
                </Button>
              </Col>
            </Row>
          </Form>
        </FormProvider>
      </ModalBootstrap.Body>
    </ModalBootstrap>
  );
};
