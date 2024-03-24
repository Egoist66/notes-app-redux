import {
  ControlOutlined,
  ExpandOutlined,
  FormOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Search } from "../components/Search";

export const RoutesData = [
  {
    key: "1",
    icon: <FormOutlined />,
    label: (
      <NavLink className={"nav-link"} to={"/"}>
        Заметки
      </NavLink>
    ),
  },
  {
    key: "2",
    icon: <ExpandOutlined />,
    label: (
      <NavLink id={"frame"} className={"nav-link"} to={"/frames"}>
        Фреймы
      </NavLink>
    ),
  },
  {
    key: "3",
    icon: <SnippetsOutlined />,
    label: (
      <NavLink id={"stickers"} className={"nav-link"} to={"/stickers"}>
        Стикеры
      </NavLink>
    ),
  },
  {
    key: "4",
    icon: <InfoCircleOutlined />,
    label: (
      <NavLink id={"info-page"} className={"nav-link"} to={"/information"}>
        Информация
      </NavLink>
    ),
  },

  {
    key: "5",
    icon: <ControlOutlined />,
    label: (
      <NavLink id={"settings"} className={"nav-link"} to={"/settings"}>
        Настройки
      </NavLink>
    ),
  },

  {
    key: "6",
    icon: <SearchOutlined />,
    label: <Search />,
  },
];
