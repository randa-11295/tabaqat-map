import { Card , Skeleton } from "@mui/material";

const LoaderCard = () => (
  <Card sx={{ p: 2, my: 2 }}>
    <Skeleton variant="rounded" height={50} />
  </Card>
);

export default LoaderCard