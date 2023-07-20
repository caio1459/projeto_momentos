export interface Momento {
  id?: string | number;
  titulo: string;
  descricao: string;
  image: string;
  created_at?: string;
  update_at?: string;
  comentario?: [{ userName: string; texto: string }];
}
