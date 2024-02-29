export type User = {
  id: string;
  name: string;
  credentials: { cuil: string; key: string };
};

export type UsersList = User[];

export type DataSRG = {
  numCuil: string;
  razonSocial: string;
  montoCapSocial: string;
  montoFondoRiesgo: string;
};

export type DataTablaPagos = {
  ultimaCarga: string;
  mesAnterior: string;
  mesActual: string;
  numMes: string;
  contribucion: string;
  retribucion: string;
};

export type Note = {
  data: {
    note: { text: string; attachments: { id: string; size: number }[] };
  };
};

export type Notes = {
  data: {
    notes: [{ note: { text: string; attachments: [] } }];
  };
};

export type NoteDigest = {
  periodo: string;
  edit: string[];
  add: string[];
};

export type TableData = {
  cuil?: string;
  ultimaCarga?: string;
  mesActual: string;
  numMes: string;
  valTipoFactura: number;
  numeroFactura: string;
  monto: string;
};

export type Deducciones = {
  cuil: string;
  mes: string;
  tipo: string;
  numero: string;
  monto: string;
  montoRein: string;
};

export type FormattedData = {
  tipo: string;
  datos: Deducciones;
};

export type Carga = {
  editar: FormattedData[];
  agregar: FormattedData[];
};
