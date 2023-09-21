import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { fetchItems } from "@/utils/api";

const List = () => {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getData();
  }, [setItems]);

  const getData = async () => {
    const itemsData = await fetchItems();
    setItems(itemsData);
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      fetchItems();
    } catch (error) {
      console.log("F en el chat: ", error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple-table">
          <TableHead>
            <TableRow>
              <TableCell>Certificado</TableCell>
              <TableCell align="right">Accion 1</TableCell>
              <TableCell align="right">Accion 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.nombreItem}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => router.push(`/update/${item._id}`)}
                  >
                    Actualizar
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => console.log("Borrar: ", item._id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
