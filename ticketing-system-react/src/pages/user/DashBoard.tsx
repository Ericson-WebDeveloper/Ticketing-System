import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import DashBoard1 from "../../components/DashBoard1";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getDashData } from "../../store/user/userActions";

type DashBoardProps = {};

const DashBoard = (props: DashBoardProps) => {
  const dispatch = useAppDispatch();
  const shouldLog = useRef(true);
  const { dash, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchDatas = async () => {
      if (shouldLog.current) {
        shouldLog.current = false;
        await dispatch(getDashData());
      }
    };

    fetchDatas();
  }, [dispatch]);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-2">
          <div className="flex flex-col w-full">
            <h1 className="text-center">Ticket's Status</h1>
            <DashBoard1
              datas={dash?.status || null}
              field={"status_name"}
              field2={"status_total"}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-center">Tickets Type</h1>
            <DashBoard1
              datas={dash?.type || null}
              field={"type_name"}
              field2={"type_total"}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-center">Tickets Environment</h1>
            <DashBoard1
              datas={dash?.env || null}
              field={"environment_name"}
              field2={"environment_total"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
