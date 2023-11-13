import {FC} from "react";
import {Button, Flex, Result} from "antd";
import {useNavigate} from "react-router-dom";

const Page404: FC = () => {
    const navigate = useNavigate()
    return (

            <Result
                status="404"
                title="404"
                subTitle="Страницу которую вы запрашиваете не существует"
                extra={<Button onClick={() => navigate('/')} type="primary">На главную</Button>}
            />

    )
}

export default Page404