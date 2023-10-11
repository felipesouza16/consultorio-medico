import { Diary, Medic } from "../types/types";

export const useLocalStorage = () => {
  const agendamentosStorage = localStorage.getItem("agendamentos");
  const medicosStorage = localStorage.getItem("medicos");

  const generateMedicosStorage = () => {
    const medicos: Medic[] = [
      {
        nome: "Dr. X",
        especializacao: "Pediatra",
        disponivel: true,
      },
      {
        nome: "Dr. Y",
        especializacao: "Cardiologista",
        disponivel: true,
      },
      {
        nome: "Dra. Z",
        especializacao: "Geral",
        disponivel: true,
      },
      {
        nome: "Dra. A",
        especializacao: "Genicologista",
        disponivel: false,
      },
    ];

    localStorage.setItem("medicos", JSON.stringify(medicos));
  };

  const generateAgendamentosStorage = () => {
    const agendamentos: Diary[] = [
      {
        horario: "08:00",
        data: new Date().toISOString(),
      },
      {
        horario: "08:30",
        data: new Date().toISOString(),
      },
      {
        horario: "09:00",
        data: new Date().toISOString(),
      },
      {
        horario: "09:30",
        data: new Date().toISOString(),
      },
      {
        horario: "10:00",
        data: new Date().toISOString(),
      },
      {
        horario: "10:30",
        data: new Date().toISOString(),
      },
      {
        horario: "11:00",
        data: new Date().toISOString(),
      },
      {
        horario: "11:30",
        data: new Date().toISOString(),
      },
      {
        horario: "12:00",
        data: new Date().toISOString(),
      },
      {
        horario: "12:30",
        data: new Date().toISOString(),
      },
      {
        horario: "13:00",
        data: new Date().toISOString(),
      },
      {
        horario: "13:30",
        data: new Date().toISOString(),
      },
      {
        horario: "14:00",
        data: new Date().toISOString(),
      },
      {
        horario: "14:30",
        data: new Date().toISOString(),
      },
      {
        horario: "15:00",
        data: new Date().toISOString(),
      },
      {
        horario: "15:30",
        data: new Date().toISOString(),
      },
      {
        horario: "16:00",
        data: new Date().toISOString(),
      },
      {
        horario: "16:30",
        data: new Date().toISOString(),
      },
      {
        horario: "17:00",
        data: new Date().toISOString(),
      },
      {
        horario: "17:30",
        data: new Date().toISOString(),
      },
      {
        horario: "18:00",
        data: new Date().toISOString(),
      },
    ];

    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  };

  if (!medicosStorage) {
    generateMedicosStorage();
  }
  if (!agendamentosStorage) {
    generateAgendamentosStorage();
  }

  const addAgendamentos = (data: Diary) => {
    const currentAgendamentos: Diary[] = JSON.parse(agendamentosStorage ?? "");
    currentAgendamentos.forEach((agen) => {
      if (agen.horario === data.horario) {
        agen.data = data.data;
        agen.medico = data.medico;
        agen.paciente = data.paciente;
      }
    });

    localStorage.setItem("agendamentos", JSON.stringify(currentAgendamentos));
  };

  const removeAgendamentos = (horario: string) => {
    const currentAgendamentos: Diary[] = JSON.parse(agendamentosStorage ?? "");
    const newAgendamentos = currentAgendamentos.map((agen: Diary) =>
      horario === agen.horario
        ? {
            horario: horario,
            data: new Date().toISOString(),
          }
        : agen
    );

    localStorage.setItem("agendamentos", JSON.stringify(newAgendamentos));
  };

  return {
    medicosStorage,
    agendamentosStorage,
    addAgendamentos,
    removeAgendamentos,
  };
};
