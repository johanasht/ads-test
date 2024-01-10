import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

// Contoh data sementara
let books = [
  { id: 1, title: "Book 1", author: "Author 1", price: 19.99 },
  { id: 2, title: "Book 2", author: "Author 2", price: 29.99 },
];

app.use(bodyParser.json());

// Read (GET): Mendapatkan semua buku
app.get("/api/books", (req: Request, res: Response) => {
  res.json(books);
});

// Read (GET): Mendapatkan buku berdasarkan ID
app.get("/api/books/:id", (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Create (POST): Menambahkan buku baru
app.post("/api/books", (req: Request, res: Response) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.json(newBook);
});

// Update (PUT): Mengubah buku berdasarkan ID
app.put("/api/books/:id", (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook };
    res.json(books[index]);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Delete (DELETE): Menghapus buku berdasarkan ID
app.delete("/api/books/:id", (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((b) => b.id !== bookId);
  res.json({ message: "Book deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
