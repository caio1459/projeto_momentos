export interface Comentario {
  id?: string | number;
  userName: string;
  texto: string;
  momento_id: string | number;
  created_at?: string;
  update_at?: string;
}
