import { fetchItems } from "@/utils/api";
import { lightGreen, red } from "@mui/material/colors";
import { useEffect, useState } from "react";

const { Box, Typography, Grid, Paper } = require("@mui/material");

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Vamos a traer la data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchItems();
      setItems(data);
      setIsLoading(false);
    };

    // Ejecuto la funcion dentro del mismo effect
    fetchData();
  }, []);

  const sortedItems = [...items].sort((a, b) => {
    if (a.statusItem === b.statusItem) {
      return a.diasItem - b.diasItem;
    }

    return a.statusItem ? -1 : 1;
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Monitoreo de Certificados by Giorgio
      </Typography>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={2}>
          {sortedItems.map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item._id}>
              <Paper elevation={3}>
                <Box
                  p={2}
                  sx={{
                    backgroundColor: item.statusItem
                      ? lightGreen["A400"]
                      : red[500],
                  }}
                >
                  <Typography variant="subtitle1">{item.nombreItem}</Typography>
                  <Typography variant="subtitle1">
                    Vence en {item.diasItem} dias
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
