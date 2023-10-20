export type DataChart = {
  name: string;
  Consultas: number;
};

export type WarningTable = {
  titulo: string;
  descricao: string;
  data: string;
};

export type Medic = {
  id: number;
  nome: string;
  especializacao: string;
  disponivel: boolean;
};

export type Columns = {
  key: string;
  name: string;
};

export type Diary = {
  horario: string;
  data: string;
  medico?: Medic;
  paciente?: Patient;
  valor?: string;
};

export type Patient = {
  nome: string;
  cpf: string;
  data: string;
  endereco: string;
};

export type Appointment = {
  nomePaciente: string;
  nomeMedico: string;
  especializacao: string;
  valor: string;
};
