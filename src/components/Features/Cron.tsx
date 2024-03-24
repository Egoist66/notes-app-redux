import { FC, useEffect, useState } from "react";
import { watchTaskUnixTime, watchEditTaskTime } from "../../store/todo-slice";
import { formatDate } from "../../utils/utils";
import { DatePicker, DatePickerProps, Flex } from "antd";
import { useAppDispatch } from "../../store/store";

type CronTypeProps = {
  id: number;
};

export const Cron: FC<CronTypeProps> = ({ id }) => {
  const [timeValue, setTimeValue] = useState<any>(
    new Date().toISOString()
  );
  const dispatch = useAppDispatch();

  const onChange: DatePickerProps["onChange"] = (dateString) => {
    setTimeValue(dateString);
  };

  useEffect(() => {
    dispatch(
      watchTaskUnixTime({
        id: id,
        unixTime: new Date(timeValue as string).getTime(),
      })
    );

    dispatch(
      watchEditTaskTime({
        id: id,
        newTime: formatDate(new Date(timeValue as string).getTime()),
      })
    );
  }, [timeValue]);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 50,
        borderRadius: 10,
      }}
    >
      <Flex gap={20}>
        <DatePicker onChange={onChange} />
      </Flex>
    </div>
  );
};
