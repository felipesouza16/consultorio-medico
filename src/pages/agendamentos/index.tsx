import { PlusCircle } from "@/src/assets/plus-circle";
import { Trash } from "@/src/assets/trash";
import { User } from "@/src/assets/user";
import { DatePicker } from "@/src/components/datepicker";
import { Modal } from "@/src/components/modal";
import { months } from "@/src/constants/months";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { Diary, Medic, Patient } from "@/src/types/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";

export const Agendamentos = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentDiary, setCurrentDiary] = useState<{
    horario: string;
    medico: string;
    paciente: Patient;
  } | null>();
  const [horario, setHorario] = useState("");

  const today = new Date();
  const {
    medicosStorage,
    agendamentosStorage,
    addAgendamentos,
    removeAgendamentos,
  } = useLocalStorage();
  const currentMedicos: Medic[] | null[] = JSON.parse(medicosStorage || "");
  const currentAgendamentos: Diary[] | null[] = JSON.parse(
    agendamentosStorage || ""
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleConfirmModal = (data: any) => {
    const currentData: Diary = {
      data: new Date().toISOString(),
      horario: data.horario,
      medico: {
        nome: currentMedicos[Number(data.medico)]?.nome || "",
        disponivel: currentMedicos[Number(data.medico)]?.disponivel || true,
        especializacao:
          currentMedicos[Number(data.medico)]?.especializacao || "",
      },
      paciente: data.paciente,
    };
    addAgendamentos(currentData);
    setOpen(false);
  };

  const handleRemoveAgen = (horario: string) => {
    removeAgendamentos(horario);
    navigate(0);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setTimeout(() => {
      setCurrentDiary(null);
    }, 500);
  };

  const handleOpenModal = (horario: string) => {
    setHorario(horario);
    setOpen(true);
  };

  return (
    <>
      <Modal
        isOpen={open}
        handleClose={handleCloseModal}
        diary={currentDiary}
        handleConfirm={handleConfirmModal}
        horarioAgen={horario}
      />
      <div className="container-fluid mt-5 px-5">
        <div className="row gap-3">
          <div className="col">
            <h5>Médicos</h5>
            <div
              className="row d-flex"
              style={{ rowGap: "5px", maxHeight: "180px", overflow: "auto" }}
            >
              {currentMedicos?.map((medico, index) => (
                <div className="card" style={{ maxHeight: "80px" }} key={index}>
                  <div className="row">
                    <div className="col d-flex justify-content-center align-items-center">
                      <User />
                    </div>
                    <div className="col-10 d-flex justify-content-center align-items-center">
                      <div className="card-body" style={{ maxHeight: "80px" }}>
                        <h6>{medico?.nome}</h6>
                        <p>{medico?.especializacao}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <DatePicker />
            </div>
          </div>
          <div className="col-8">
            <h5>
              {today.getDay()}/{months[today.getMonth()]}/{today.getFullYear()}
            </h5>
            <div
              className="row"
              style={{ rowGap: "5px", maxHeight: "77vh", overflow: "auto" }}
            >
              {currentAgendamentos?.map((agen, index) => (
                <div className="card" style={{ height: "80px" }} key={index}>
                  <div className="row">
                    <div
                      className="col d-flex justify-content-center align-items-center"
                      style={{ height: "80px" }}
                    >
                      <h5>{agen?.horario}</h5>
                    </div>
                    <div className="col-8 d-flex align-items-center justify-content-center">
                      {agen?.medico && (
                        <div
                          className="d-flex align-items-center justify-content-between"
                          style={{ width: "100%", height: "80px" }}
                        >
                          <Col className="d-flex align-items-center justify-content-start">
                            <Col xs={1}>
                              <User />
                            </Col>
                            <Col
                              className="card-body"
                              style={{ height: "80px" }}
                            >
                              <h6>{agen.medico.nome}</h6>
                              <p>{agen.medico.especializacao}</p>
                            </Col>
                          </Col>
                          <Col className="d-flex align-items-center justify-content-start">
                            <Col xs={1}>
                              <User />
                            </Col>
                            <Col
                              className="card-body"
                              style={{ height: "80px" }}
                            >
                              <h6>{agen?.paciente?.nome}</h6>
                              <p>{agen?.paciente?.cpf}</p>
                            </Col>
                          </Col>
                        </div>
                      )}
                    </div>
                    <div className="col">
                      {agen?.medico ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            gap: "10px",
                          }}
                        >
                          <button
                            className="btn btn-light d-flex"
                            style={{ borderRadius: "9999px" }}
                            type="button"
                            onClick={() => handleRemoveAgen(agen.horario)}
                          >
                            <Trash />
                          </button>
                          {/* <button
                            className="btn btn-light d-flex"
                            style={{ borderRadius: "9999px" }}
                            type="button"
                            onClick={() => {
                              setCurrentDiary({
                                medico: agen?.medico?.nome || "",
                                horario: agen?.horario || "",
                                paciente: agen?.paciente || ({} as Patient),
                              });
                              handleOpenModal(agen?.horario || "");
                            }}
                          >
                            <Pen />
                          </button> */}
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                          }}
                        >
                          <button
                            className="btn btn-light d-flex"
                            style={{ borderRadius: "9999px" }}
                            type="button"
                            onClick={() => handleOpenModal(agen?.horario || "")}
                          >
                            <PlusCircle />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
