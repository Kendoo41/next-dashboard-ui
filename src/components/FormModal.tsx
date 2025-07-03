"use client";
import { deleteSubject } from "@/lib/actions";
import { announcementsData, assignmentsData } from "@/lib/data";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { eventNames } from "process";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteSubject,
  teacher: deleteSubject,
  student: deleteSubject,
  parent: deleteSubject,
  lesson: deleteSubject,
  exam: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});
const EventForm = dynamic(() => import("./forms/EventForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any
  ) => JSX.Element;
} = {
  teacher: (setOpen, type, data) => (
    <TeacherForm setOpen={setOpen} type={type} data={data} />
  ),
  student: (setOpen, type, data) => (
    <StudentForm setOpen={setOpen} type={type} data={data} />
  ),
  parent: (setOpen, type, data) => (
    <ParentForm setOpen={setOpen} type={type} data={data} />
  ),
  subject: (setOpen, type, data) => (
    <SubjectForm setOpen={setOpen} type={type} data={data} />
  ),
  class: (setOpen, type, data) => (
    <ClassForm setOpen={setOpen} type={type} data={data} />
  ),
  lesson: (setOpen, type, data) => (
    <LessonForm setOpen={setOpen} type={type} data={data} />
  ),
  exam: (setOpen, type, data) => (
    <ExamForm setOpen={setOpen} type={type} data={data} />
  ),
  event: (setOpen, type, data) => (
    <EventForm setOpen={setOpen} type={type} data={data} />
  ),
  result: (setOpen, type, data) => (
    <ResultForm setOpen={setOpen} type={type} data={data} />
  ),
  assignment: (setOpen, type, data) => (
    <AssignmentForm setOpen={setOpen} type={type} data={data} />
  ),
  announcement: (setOpen, type, data) => (
    <AnnouncementForm setOpen={setOpen} type={type} data={data} />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
        ? "bg-lamaSky"
        : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`Subject has been ${type === "create" ? "created" : "updated"}`);
        setOpen(false);
        router.refresh();
      }
    }, [state, router]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden/> 
        <span className="text-center font-medium">
          All data will be lost. Are you sure to delete all items {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      // <TeacherForm type={"create"}/>
      forms[table](setOpen, type, data)
    ) : (
      "Form not found"
    );
  };

  return (
    <>
      <button
        className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={20} height={20}></Image>
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14}></Image>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
