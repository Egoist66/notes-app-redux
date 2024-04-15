import { FC, useEffect, useState } from "react";
import { Form, Input, Button, Space, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { ShortCodesTable } from "../Features/ShortCodes";
import { useShortCodeForm } from "../../hooks/useShortCodeForm";
import { useAppDispatch } from "../../store/store";
import { deleteShortCode, initShortCodes } from "../../store/todo-shortcodes";
import { Helmet } from "react-helmet";

const { Text } = Typography;

const Additional: FC = () => {

  const [form] = Form.useForm();
  const [id, setID] = useState<string>('');
  const dispatch = useAppDispatch();
  const {generateShortCode} = useShortCodeForm();
  

  useEffect(() => {
        dispatch(initShortCodes())
  }, [])

  return (
    <>
       <Helmet>
        <meta charSet="utf-8" />
        <title>Дополнительно</title>
        <link rel="canonical" href="/" />
      </Helmet>

      <h2 style={{ color: "#001529", textAlign: "center" }}>Создать шорткод</h2>

      <Text
        style={{ paddingBottom: 50, display: "block" }}
        underline
        type={"secondary"}
      >
        Здесь вы можете создать собственный шорткод для упрощения и добавления
        некоторой автоматизации в процессе создания заметок. Шорткод - набор
        строковых символов (атрибутов и значений), которые можно вставлять в
        заметку для быстрых действий. Это немного напоминает макрос, если
        знакомы с MS word
        <br /> Для того чтобы создать "Шорткод", выполните шаги: ➡️ "Задайте
        имя" ➡️ "Заполните параметры" и нажмите "Сгенерировать".
        <Text type={"danger"}>
          {" "}
          Под каждый полем есть знак вопроса (?) который более детально
          подскажет, после скопируйте шорткод из таблицы ниже и вставьте в{" "}
          <NavLink to="/">поле создания заметки</NavLink>.
        </Text>
        <br />
      </Text>
      <Form form={form} onFinish={(formatDate) => {
            if(generateShortCode(
                formatDate?.shortcodeName, 
                `${formatDate?.param1} ${formatDate?.param2 ?? ''}`.trim()
            )){
                form.resetFields();
            }

      }}>
        <Form.Item
        
          style={{ marginBottom: 50 }}
          tooltip="Формат шорткода должен быть в следующей форме - [name]"
          label="Название"
          name="shortcodeName"
          rules={[{ required: true, message: "Введите название шорткода" }]}
        >
          <Input  name="shortcodeName" />
        </Form.Item>
        <Form.Item
          tooltip="Описание шорткода"
          label="Параметр 1"
          name="param1"
        >
          <Input name="param1" required placeholder="Данный параметр обязателен" maxLength={50} />
        </Form.Item>
        <Form.Item
          tooltip="Ресурс шорткода (URL ссылка)"
          label="Параметр 2"
          name="param2"
        >
          <Input name="param2" type="url" maxLength={100} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button  type="primary" htmlType="submit">
              Сгенерировать
            </Button>
            
          </Space>
        </Form.Item>
      </Form>

        <Form style={{ paddingTop: 50 }}>
            <h3>Удалить шорткод</h3>
            <Form.Item>
                <Input 
                    onBlur={() => {
                        dispatch(deleteShortCode({id}))
                        setID('')
                    }}
                    title="Введите ID шорткода для удаления и нажмите Tab" 
                    style={{width: 300}}
                    onChange={(e) => setID(e.target.value)}
                    value={id} 
                    placeholder="Введите ID шорткода" 
                />
            </Form.Item>
        </Form>
        <ShortCodesTable />
   
    </>
  );
};

export default Additional;
