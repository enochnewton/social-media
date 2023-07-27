"use client";
import Container from "@mui/material/Container";
import { homeContainerSx } from "@utils/styles";
import PageContent from "@components/PageContent";
import ResponsiveLayout from "@components/Layout";
import { useSelector } from "react-redux";

const Home = () => {
  const linkName = useSelector(state => state.linkName);
  return (
    <Container component='section' sx={homeContainerSx}>
      <ResponsiveLayout>
        <PageContent linkName={linkName} />
      </ResponsiveLayout>
    </Container>
  );
};

export default Home;
