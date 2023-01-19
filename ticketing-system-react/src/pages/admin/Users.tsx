import React, { useEffect, useRef, useState, useMemo } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import EditUserModal from "../../components/EditUserModal";
import AddUser from "../../components/Forms/AddUser";
import ModalForm from "../../components/ModalForm";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import ViewUserModal from "../../components/ViewUserModal";
import { getJobs } from "../../store/job/jobAction";
import { getJobLoading, jobsMemoized } from "../../store/job/jobSlice";
import { getRoles } from "../../store/role/roleActions";
import { rolesLoading, rolesMemoized } from "../../store/role/roleSlice";
import { getUser, getUsers } from "../../store/user/userActions";
import "../../assets/styles/Pagination.css";

import {
  SET_RESET_ERROR,
  SET_U_SUCCESS,
  userCrudError,
  userCrudErrors,
  userCrudSuccess,
  userLoading,
  usersAll,
  userViewSelector,
} from "../../store/user/userSlice";
import { RootState, useAppDispatch } from "../../store/store";

type UsersProps = {};

const Users = (props: UsersProps) => {
  const [page, setpage] = useSearchParams();
  const dispatch = useAppDispatch();
  const shouldLog1 = useRef(true);
  const shouldLog2 = useRef(true);
  // const {loading: jobloading} = useSelector(state => state.job);
  const jobloading = useSelector(getJobLoading);
  // const {loading: roleloading} = useSelector(state => state.role);
  const roleloading = useSelector(rolesLoading);
  const userCrudLoading = useSelector(userLoading);
  const users = useSelector(usersAll);
  const userView = useSelector(userViewSelector);

  const jobs = useSelector((state: RootState) => jobsMemoized(state));
  const roles = useSelector((state: RootState) => rolesMemoized(state));

  const userErrorCrud = useSelector(userCrudError);
  const userErrorCruds = useSelector(userCrudErrors);
  const userSuccessCrud = useSelector(userCrudSuccess);

  const [addUserModal, setAddUserModal] = useState("");
  const [viewModal, setViewUserModal] = useState("");
  const [userEditModal, setEditUserModal] = useState("");

  const setViewUserData = async (id: number) => {
    // call api to get user data set redux data
    await dispatch(getUser(id));
    setViewUserModal("block");
  };

  const OnEdituser = async (id: number) => {
    // call api to get user data set redux data
    await dispatch(getUser(id));
    setEditUserModal("block");
  };

  const returnPageNumber = useMemo(() => {
    return page.get("page") ? parseInt(page.get("page")!) : 1;
  }, [page]);

  useEffect(() => {
    let pageNumber: number = returnPageNumber;
    const fetchDatas = async () => {
      if (shouldLog2.current) {
        shouldLog2.current = false;
        await dispatch(getUsers(pageNumber));
      }
    };
    fetchDatas();
  }, [dispatch, returnPageNumber]);

  useEffect(() => {
    const fetchDatas = async () => {
      if (shouldLog1.current) {
        shouldLog1.current = false;
        await dispatch(getJobs());
        await dispatch(getRoles());
      }
    };
    fetchDatas();
  }, [dispatch]);

  useEffect(() => {
    if (userErrorCrud) {
      let errorData = userErrorCrud;
      dispatch(SET_RESET_ERROR());
      toast.error(`${errorData}`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
    if (userErrorCruds) {
      let errors = userErrorCruds;
      dispatch(SET_RESET_ERROR());
      Object.keys(errors).forEach((key) => {
        toast.error(`${errors[key][0]}`, {
          theme: "dark",
          autoClose: 10000,
          // hideProgressBar: false,
          closeOnClick: true,
        });
      });
    }

    if (userSuccessCrud) {
      let successMessage = userSuccessCrud;
      dispatch(SET_U_SUCCESS(null));
      toast.success(`${successMessage}`, {
        theme: "dark",
        autoClose: 10000,
        // hideProgressBar: false,
        closeOnClick: true,
      });
    }
  }, [dispatch, userErrorCrud, userErrorCruds, userSuccessCrud]);

  if (jobloading || roleloading || userCrudLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div>
      <Table
        color="light"
        title="Users"
        setModal={setAddUserModal}
        setViewUserData={setViewUserData}
        setEditUser={OnEdituser}
        users={users}
      />

      {
        // https://www.capscom-technology.com/tutorial/react-js-and-laravel-pagination/Qy3PXRBQX6dk
        users?.data && users?.data?.length > 0 && (
          <div className="flex justify-end mt-5">
            <Pagination
              activePage={users?.current_page!}
              totalItemsCount={users?.total!}
              itemsCountPerPage={users?.per_page!}
              onChange={async (pageNumber) => {
                if (pageNumber !== (page.get("page") ?? 1)) {
                  setpage({ page: String(pageNumber) });
                  await dispatch(getUsers(pageNumber));
                }
                // await dispatch(getUsers(pageNumber));
              }}
              itemClass="page-item"
              linkClass="page-link"
              firstPageText="First"
              lastPageText="Last"
            />
          </div>
        )
      }

      <ModalForm
        show={addUserModal}
        setModal={setAddUserModal}
        title="Add User Form"
      >
        <>
          <AddUser
            setModal={setAddUserModal}
            jobs={jobs}
            roles={roles}
            success={userSuccessCrud}
          />
        </>
      </ModalForm>

      <ViewUserModal
        show={viewModal}
        setModal={setViewUserModal}
        title="User Details"
        user={userView}
      />
      <EditUserModal
        show={userEditModal}
        setModal={setEditUserModal}
        title="Edit User Details"
        jobs={jobs}
        roles={roles}
        user={userView}
        page={page}
      />
    </div>
  );
};

export default Users;
