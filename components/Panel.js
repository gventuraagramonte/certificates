import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Box, Grid, Typography, Link, Paper } from "@mui/material";
import { lightGreen, red } from "@mui/material/colors";
import { fetchItems } from "@/utils/api";

const Panel = ({ data }) => {
  const [itemsPanel, setItemsPanel] = useState(data);

  const getData = async () => {
    try {
      const itemsData = await fetchItems();
      console.log("En panel: ", itemsData);
      return itemsData;
    } catch (error) {
      console.log("Error trayendo data: ", error);
      return [];
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const newData = await getData();
        setItemsPanel(newData);
      } catch (error) {
        console.error(error);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [itemsPanel]);

  const sortedItems = [...itemsPanel].sort((a, b) => {
    if (a.statusItem === b.statusItem) {
      return a.diasItem - b.diasItem;
    }

    return a.statusItem ? -1 : 1;
  });

  return (
    <Grid container spacing={1}>
      {sortedItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
          <NextLink href={`/item/${item._id}`} passHref legacyBehavior>
            <Link underline="none">
              <Paper elevation={3}>
                <Box
                  p={2}
                  sx={{
                    backgroundColor: item.statusItem
                      ? lightGreen["A400"]
                      : red[500],
                    border: item.diasItem < 30 ? "2px solid red" : "none",
                  }}
                >
                  <Typography variant="subtitle1">{item.nombreItem}</Typography>
                  <Typography variant="subtitle1">
                    Vence en {item.diasItem} dias
                  </Typography>
                </Box>
              </Paper>
            </Link>
          </NextLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default Panel;
