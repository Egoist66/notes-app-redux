import { FC } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";


const Page404: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404</title>
        <link rel="canonical" href="/" />
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="Страницу которую вы запрашиваете не существует"
        extra={
          <Button onClick={() => navigate("/")} type="primary">
            На главную
          </Button>
        }
      />
    </>
  );
};

export default Page404;
