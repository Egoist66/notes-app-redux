import { FC, memo, useRef } from "react";
import { useBackUp } from "../../hooks/useBackUp";
import Swal from "sweetalert2";
import { Button, Col, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Settings: FC = memo(() => {
  const { backup, restore, eraseAll, loading } = useBackUp();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const warnClear = () => {
    Swal.fire({
      title: "Данные удалены!",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonColor: "#1677FF",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.reload();
    });
  };

  const uploadFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Настройки</title>
        <link rel="canonical" href="/" />
      </Helmet>
      <Col lg={12}>
        <Flex wrap={"wrap"} gap={20}>
          <Button onClick={backup}>Создать резервную копию</Button>
          <Button onClick={uploadFile}>
            {loading ? "Восстановление..." : "Восстановить из копии"}
          </Button>
          <Button
            danger
            title={"Перед очисткой рекомендуем сделать копию"}
            onClick={() => eraseAll([warnClear, () => navigate("/")])}
          >
            Стереть все
          </Button>

          <input
            onChange={restore}
            ref={inputRef}
            hidden
            accept={"application/json"}
            id={"file"}
            type="file"
          />
        </Flex>
      </Col>
    </>
  );
});

export default Settings;
