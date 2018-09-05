export class Reimb {
  id: number;
  amount: number;
  submitted: string;
  resolved: string;
  description: string;
  author: number;
  resolver: number;
  statusId: number;
  typeId: number;

  constructor(
    id?: number,
    amount?: number,
    submitted?: string,
    resolved?: string,
    description?: string,
    author?: number,
    resolver?: number,
    statusId?: number,
    typeId?: number
  ) {
    if (id !== undefined) {
      this.id = id;
    }
    amount && (this.amount = amount);
    submitted && (this.submitted = submitted);
    resolved && (this.resolved = resolved);
    description && (this.description = description);
    author && (this.author = author);
    resolver && (this.resolver = resolver);
    if (statusId !== undefined) {
      this.statusId = statusId;
    }
    if (typeId !== undefined) {
      this.typeId = typeId;
    }
  }
}
