import { FC } from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { LS, useMeasureApp } from "../../hooks/hooks";
import { Badge, Flex, Tooltip } from "antd";
import { useAppSelector } from "../../store/store";

export const Storage: FC = () => {
  const { currentSize, isStorageFull} = useMeasureApp();
  const {get} = LS()
  const { todos } = useAppSelector((state) => state.todos);

  return (
    <>
      <div id={"storage"}>
        <Flex wrap="wrap" style={{marginBottom: 10}} justify="flex-end" gap={2} align="end">
          
          <Tooltip placement="top" title="Кол-во занимаемой памяти хранилища">
            <DeleteOutlined />
          </Tooltip>
          <span
            className={"storage"}
            style={{ color: isStorageFull ? "red" : "" }}
          >
            <Badge color={isStorageFull ? "red" : "#1677FF" } count={`${Math.ceil(currentSize * 1024)}кб`} />
          
          </span>
        
        </Flex>

        <Flex wrap="wrap" justify="flex-end" gap={10} id={"tasks"}>
          <Tooltip  placement="top" title="Кол-во текущих задач">
            <FormOutlined />
          </Tooltip>
        
          <Badge  count={get('todos')?.length} />
          <span hidden>{todos.length}</span>
          
        </Flex>
      </div>
    </>
  );
};
