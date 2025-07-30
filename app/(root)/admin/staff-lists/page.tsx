"use client";
import Loading from "@/app/(root)/staff/loading";
import CustomTable from "@/app/components/custom-table";
import React, { Suspense, useState } from "react";
import { StaffList } from "@/app/type/staffList";
import {
  useFetchStaffs,
  useSuspendStaff,
  useUnSuspendStaff,
} from "@/app/hooks/useFetchStaff";
import Modal from "@/app/components/modal";
import ModalTitle from "@/app/components/modal-title";
import CustomBtn from "@/app/components/custom-btn";

const Page = () => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [suspendModal, setSuspendModal] = useState(false);
  const [unsuspendModal, setUnsuspendModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [staffId, setStaffId] = useState(0);

  const {
    mutate: suspendMutate,
    isPending: isSuspendPending,
    error: suspendError,
  } = useSuspendStaff(() => {
    setSuspendModal(false);
  });

  const {
    mutate: unsuspendMutate,
    isPending: isUnsuspendPending,
    error: unsuspendError,
  } = useUnSuspendStaff(() => {
    setUnsuspendModal(false);
  });

  const { error, isLoading, data } = useFetchStaffs<StaffList[]>();

  // Calculate total pages
  const total = data?.length || 0;
  const lastPage = Math.ceil(total / pageSize);

  // Handle pagination changes
  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Handle Suspend
  const handleSuspend = () => {
    suspendMutate(staffId);
  };

  // Handle Unsuspend
  const handleUnsuspend = () => {
    unsuspendMutate(staffId);
  };

  // Define table columns
  const columns = [
    {
      title: "No",
      key: "id",
      dataIndex: "id",
      render: (value: string, record: StaffList, index: number) => (
        <span>{(currentPage - 1) * pageSize + index + 1}</span>
      ),
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Confirmed At",
      key: "confirmed_at",
      dataIndex: "confirmed_at",
      render: (confirmedAt: string) => {
        return confirmedAt
          ? new Date(confirmedAt).toLocaleDateString()
          : "Not Confirmed";
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "suspended",
      render: (suspended: number) => (
        <p
          className={`${
            suspended === 1 ? "text-orange-600" : "text-green-600"
          }`}
        >
          {suspended === 1 ? "Suspended" : "Active"}
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: (_: any, record: StaffList) => (
        <>
          {record.suspended === 1 ? (
            <button
              onClick={() => {
                setStaffId(record.id);
                setUnsuspendModal(true);
              }}
              className="text-white font-medium px-3 py-1 bg-green-600 hover:bg-green-700 duration-300 rounded-lg cursor-pointer"
            >
              <p className="text-sm">Unsuspend</p>
            </button>
          ) : (
            <button
              onClick={() => {
                setStaffId(record.id);
                setSuspendModal(true);
              }}
              className="text-white font-medium px-3 py-1 bg-red-600 hover:bg-red-700 duration-300 rounded-lg cursor-pointer"
            >
              <p className="text-sm">Suspend</p>
            </button>
          )}
        </>
      ),
    },
  ];

  // Get paginated data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data?.slice(startIndex, endIndex);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mt-7 mb-10">
        <p className="font-[400px] text-[25px]">Staff Lists</p>
      </div>
      <div className="overflow-x-auto">
        {isLoading && (
          <div className="text-center">
            <Loading />
          </div>
        )}
        {error && <p className="text-alert-400">Error loading staffs</p>}
        {!isLoading && !error && (
          <CustomTable
            columns={columns}
            data={paginatedData}
            pagination={{
              pageSize,
              currentPage,
              lastPage,
              total,
              handleOnChange: handlePaginationChange,
            }}
          />
        )}
      </div>
      {suspendModal && (
        <Modal
          onClose={() => setSuspendModal(false)}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm mx-auto"
        >
          <ModalTitle>Suspend Confirmation</ModalTitle>
          <span className="text-center">
            Are you sure to suspend this staff?
          </span>
          <div className="flex justify-center gap-2 mt-5">
            <CustomBtn
              className="border border-alert-400 hover:bg-alert-500 hover:text-white text-black"
              onClick={() => setSuspendModal(false)}
            >
              No
            </CustomBtn>
            <CustomBtn
              className="border border-success-400 hover:bg-success-500 hover:text-white text-black flex gap-2 justify-center items-center"
              onClick={() => handleSuspend()}
            >
              {isSuspendPending && <Loading />}
              Yes
            </CustomBtn>
          </div>
        </Modal>
      )}
      {unsuspendModal && (
        <Modal
          onClose={() => setUnsuspendModal(false)}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm mx-auto"
        >
          <ModalTitle>Unsuspend Confirmation</ModalTitle>
          <span className="text-center">
            Are you sure to unsuspend this staff?
          </span>
          <div className="flex justify-center gap-2 mt-5">
            <CustomBtn
              className="border border-alert-400 hover:bg-alert-500 hover:text-white text-black"
              onClick={() => setUnsuspendModal(false)}
            >
              No
            </CustomBtn>
            <CustomBtn
              className="border border-success-400 hover:bg-success-500 hover:text-white text-black flex gap-2 justify-center items-center"
              onClick={() => handleUnsuspend()}
            >
              {isUnsuspendPending && <Loading />}
              Yes
            </CustomBtn>
          </div>
        </Modal>
      )}
      {errorModal && (
        <Modal
          onClose={() => setErrorModal(false)}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm mx-auto"
        >
          <ModalTitle>Error</ModalTitle>
          <span className="text-center">
            {suspendError || unsuspendError ? "Something Went Wrong" : ""}
          </span>
          <div className="flex justify-center gap-2 mt-5">
            <CustomBtn
              className="border border-alert-400 hover:bg-alert-500 hover:text-white text-black"
              onClick={() => setErrorModal(false)}
            >
              Ok
            </CustomBtn>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Page;
