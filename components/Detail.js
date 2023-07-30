import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import { getItemById } from "@/utils/api";
import { Card, CardContent, Container, Typography } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

export const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    const itemData = await getItemById(id);
    setItem(itemData);
  };

  if (!item) {
    return (
      <>
        <ThreeDots
          height="150"
          width="150"
          radius="9"
          color="#1976D2"
          ariaLabel="three-dots-loading"
          wrapperClass=""
          wrapperStyle={{}}
          visible={true}
        />
      </>
    );
  }

  return (
    <Container
      maxWidth="sm"
      sx={{ marginTop: "20px", alignItems: "center", textAlign: "center" }}
    >
      <CardContent sx={{ minWidth: 80 }}>
        <CardContent>
          <Typography variant="h4" color="text.primary" gutterBottom>
            {item.nombreItem}
          </Typography>
          <Typography variant="h5" component="div">
            Vence en {item.diasItem} dias
          </Typography>
          <br />
          <Typography variant="body1">
            Dia de Vencimiento
            <br />
            {item.fechaItem}
          </Typography>
          <Typography variant="body1">
            Issuer
            <br />
            {item.issuer}
          </Typography>
          <br />
          <Typography variant="body1">
            {item.diasItem >= 30 ? (
              <SentimentSatisfiedAltOutlinedIcon
                color="success"
                fontSize="large"
              />
            ) : (
              <SentimentDissatisfiedOutlinedIcon
                color="error"
                fontSize="large"
              />
            )}
          </Typography>
        </CardContent>
      </CardContent>
    </Container>
  );
};
