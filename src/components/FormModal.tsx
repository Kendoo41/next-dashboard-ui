'use client'
import Image from "next/image";

const FormModal = ({table, type, data, id}:{
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
  id?: number;
}) => {
  const size = type === "update" ? "w-8 h-8" : "w-7 h-7"
  const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-lamaSky" : "bg-lamaPurple"

  return (
    <button className={`${size} ${bgColor} flex items-center justify-center rounded-full`}>
      <Image src={`/${type}.png`} alt="" width={20} height={20}></Image>
    </button>
  )
}

export default FormModal