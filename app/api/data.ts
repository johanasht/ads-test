import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  title: string;
  description: string;
  author: string;
  price: number;
}

let dataStorage: Data[] = []; // Penyimpanan sementara

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, description, author, price } = req.body as Data;

    // Validasi data
    if (!title || !description || !author || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Simpan data ke penyimpanan sementara
    const newData: Data = { title, description, author, price };
    dataStorage.push(newData);

    res
      .status(201)
      .json({ message: "Data saved to the storage", data: newData });
  } else if (req.method === "GET") {
    res
      .status(200)
      .json({ message: "Data retrieved from the storage", data: dataStorage });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
