import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Container, FormControl, TextField } from "@mui/material";
import { createItem } from "@/utils/api";

const Create = ({ auth }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
    },
  };

  const router = useRouter();
  const [nombreItem, setNombreItem] = useState("");
  // Los campos deben tener los mismos valores que el backend
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      nombreItem,
    };

    await createItem(newItem, config);
    router.push("/");
  };

  return (
    <Container
      maxWidth="md"
      sx={{ marginTop: "100px", border: "2px solid grey", borderRadius: "5px" }}
    >
      <h1>Create New Certificate</h1>
      <form onSubmit={handleSubmit} sx={{ width: "100ch" }}>
        <TextField
          type="text"
          color="primary"
          value={nombreItem}
          onChange={(e) => setNombreItem(e.target.value)}
          fullWidth
          label="url"
        />
        <Button type="submit">Guardar</Button>
      </form>
    </Container>
  );
};

export default Create;
