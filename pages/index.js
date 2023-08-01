import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Box, Grid, Typography, Link, Paper } from "@mui/material";
import { fetchItems } from "@/utils/api";
import { lightGreen, red } from "@mui/material/colors";
import Panel from "@/components/Panel";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const fetchData = async () => {
  //       setIsLoading(true);
  //       const res = await fetchItems();
  //       console.log("Trayendo la data: ", res);
  //       setItems(res);
  //       setIsLoading(false);
  //     };

  //     fetchData();
  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, [setItems]);

  // const sortedItems = [...items].sort((a, b) => {
  //   if (a.statusItem === b.statusItem) {
  //     return a.diasItem - b.diasItem;
  //   }

  //   return a.statusItem ? -1 : 1;
  // });

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await fetchItems();
      setItems(res);
      setIsLoading(false);
    };
    getData();
  }, [setItems]);

  // return (
  //   <Box sx={{ marginTop: 10 }}>
  //     {isLoading ? (
  //       <p>Loading...</p>
  //     ) : (
  //       <Grid container spacing={2}>
  //         {sortedItems.map((item) => (
  //           <Grid item xs={6} sm={4} md={3} key={item._id}>
  //             <NextLink href={`/item/${item._id}`} passHref legacyBehavior>
  //               <Link underline="none">
  //                 <Paper elevation={3}>
  //                   <Box
  //                     p={2}
  //                     sx={{
  //                       backgroundColor: item.statusItem
  //                         ? lightGreen["A400"]
  //                         : red[500],
  //                     }}
  //                   >
  //                     <Typography variant="subtitle1">
  //                       {item.nombreItem}
  //                     </Typography>
  //                     <Typography variant="subtitle1">
  //                       Vence en {item.diasItem} dias
  //                     </Typography>
  //                   </Box>
  //                 </Paper>
  //               </Link>
  //             </NextLink>
  //           </Grid>
  //         ))}
  //       </Grid>
  //     )}
  //   </Box>
  // );
  return (
    <>
      {isLoading ? (
        <p>Loagin ...</p>
      ) : (
        <Box sx={{ marginTop: 10 }}>
          <Panel data={items} />
        </Box>
      )}
    </>
  );
};

export default Home;
