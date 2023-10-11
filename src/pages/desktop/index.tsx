import { ClipboardHearth } from "@/src/assets/clipboard-hearth";
import { GraphUp } from "@/src/assets/graph-up";
import { Person } from "@/src/assets/person";
import { Search } from "@/src/assets/search";
import { Charts } from "@/src/components/charts";
import { DataTable } from "@/src/components/data-table";
import { DatePicker } from "@/src/components/datepicker";
import { DataChart, WarningTable } from "@/src/types/types";

export const Desktop = () => {
  const dataChart: DataChart[] = [
    { name: "Jan", Consultas: 2 },
    { name: "Fev", Consultas: 5 },
    { name: "Mar", Consultas: 3 },
    { name: "Abr", Consultas: 10 },
    { name: "Mai", Consultas: 14 },
    { name: "Jun", Consultas: 12 },
    { name: "Jul", Consultas: 19 },
    { name: "Ago", Consultas: 21 },
    { name: "Set", Consultas: 24 },
    { name: "Out", Consultas: 27 },
    { name: "Nov", Consultas: 18 },
    { name: "Dez", Consultas: 10 },
  ];

  const somaConsultas = dataChart.reduce((acc, value) => {
    return Number(acc) + Number(value.Consultas);
  }, 0);

  const maiorNumeroConsultas = dataChart.reduce((acc, value) => {
    return value.Consultas > acc.Consultas ? value : acc;
  });

  const columns = [
    { key: "titulo", name: "Título" },
    { key: "descricao", name: "Descrição" },
    { key: "data", name: "Data" },
  ];

  const dataLembretes: WarningTable[] = [
    {
      titulo: "Exame",
      descricao: "Notificar paciente X sobre exame que deve ser feito.",
      data: "29/10/2023",
    },
    {
      titulo: "Vacinação",
      descricao: "Marcar vacina de gripe com paciente Y.",
      data: "20/10/2023",
    },
    {
      titulo: "Medicação",
      descricao: "Entregar a receita médica para paciente Z.",
      data: "22/10/2023",
    },
  ];

  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-8">
          <div className="row mb-5">
            <div className="d-flex">
              <input
                className="form-control me-2 mx-5"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-light pt-1" type="button">
                <Search />
              </button>
            </div>
          </div>
          <div className="row">
            <h2 className="px-5">Dashboard</h2>
            <div className="row">
              <div className="col-8">
                <Charts data={dataChart} />
              </div>
              <div
                className="col"
                style={{
                  alignContent: "space-between",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <div className="row">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title d-flex justify-content-between align-items-center">
                        Total de consultas <ClipboardHearth />
                      </h5>
                      <p className="card-text">{somaConsultas}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-title d-flex justify-content-between align-items-center">
                        Mês com maior quantidade de consultas <GraphUp />
                      </h6>
                      <p className="card-text">{maiorNumeroConsultas.name}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-title d-flex justify-content-between align-items-center">
                        Número de pacientes atendidos hoje <Person />
                      </h6>
                      <p className="card-text">12</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-5">
            <h2 className="px-5">Avisos/Lembretes</h2>
            <div className="px-5">
              <DataTable data={dataLembretes} columns={columns} />
            </div>
          </div>
        </div>
        <div
          className="col d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <DatePicker />
        </div>
      </div>
    </div>
  );
};
