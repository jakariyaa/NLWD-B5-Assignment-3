export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface IBookInterfaceMethods {
  borrowCopies(borrowQuantity: number): void;
}

export interface IBookQueryParams {
  filter?: keyof IBook["genre"];
  sortBy?: keyof IBook;
  sort?: "asc" | "desc";
  limit?: number;
}
