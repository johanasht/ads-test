"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  author: string;
}

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/books");
        const data = await response.json();
        if (Array.isArray(data)) {
          setBooks(data as Book[]);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium">Daftar Buku</h1>
      <p>Jumlah buku tersedia: {books.length}</p>

      <Link href="/create">
        <Button className="mt-2">Tambah Buku</Button>
      </Link>

      <div className="mt-2 overflow-hidden border border-gray-200 rounded-md backdrop-filter backdrop-blur-md">
        <p className="p-2">Data Buku</p>
        <table className="mt-2 w-full table-auto text-left">
          <thead>
            <tr>
              <th>Judul Buku</th>
              <th>Deskripsi</th>
              <th>Harga</th>
              <th>Penulis</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.price}</td>
                <td>{book.author}</td>
                <td>
                  <Link href={`/edit/${book.id}`}>
                    <a className="text-blue-500">Edit</a>
                  </Link>
                  <span> | </span>
                  <button className="text-red-500">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksPage;
