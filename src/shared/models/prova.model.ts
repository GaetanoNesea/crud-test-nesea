export interface ProvaModel {
  id: string;
  createId?: <T>(data: T[]) => T[];
}
