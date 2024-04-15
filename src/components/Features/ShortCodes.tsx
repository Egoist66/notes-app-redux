import { Col, Table } from "antd";
import { FC } from "react";
import { useAppSelector } from "../../store/store";


const columns = [
    {
        title: "Название шорткода",
        dataIndex: "name",
        key: "name",
    },

    {
        title: "Обозначение",
        dataIndex: "meaning",
        key: "meaning",
    },

    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    }
]

export const ShortCodesTable: FC = () => {

    const {shortcodes} = useAppSelector(state => state.todoShortcodes)
    return (
        <Col>
            <h2 style={{ color: "#001529", textAlign: "center" }}>Список шорткодов</h2>
            <Table
                pagination={false}
                dataSource={shortcodes} 
                columns={columns} 
            />
        </Col>
    )
};
