import TableSearch from "@/components/TableSearch"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import { classesData } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

const role = "admin";

type Class = {
  id:number;
  name:string;
  capacity: number;
  grade: number;
  supervisor:string;
}

const columns = [
  {
    header:"Class Name", 
    accessor:"name", 
  },
  {
    header:"Capacity", 
    accessor:"capacity", 
  },
  {
    header:"Grade", 
    accessor:"grade", 
    className:"hidden md:table-cell"
  },
  {
    header:"Supervisor", 
    accessor:"supervisor", 
    className:"hidden md:table-cell"
  },
  {
    header:"Action", 
    accessor:"action", 
  },
]
const ClassListPage = () => {
  
  const renderRow = (item:Class) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        {item.name}
      </td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.supervisor}</td>
      <td>
        <div className="flex flex-row items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"> 
              <Image src="/edit.png" alt="" width={16} height={16}></Image>
            </button>
          </Link>
            {role === "admin" && (<button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"> 
              <Image src="/delete.png" alt="" width={16} height={16}></Image>
            </button>)}
        </div>
      </td>
    </tr>
  )  // End function renderRow

  return (
    <div className="bg-white p-4 flex-1 rounded-md m-4 mt-0" >

      {/* TOP  */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch/>
          <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/filter.png" alt="" width={14} height={14}/>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/sort.png" alt="" width={14} height={14}/>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/plus.png" alt="" width={14} height={14}/>
              </button>

          </div>

        </div>
      </div>

      {/* LIST  */}
      <Table columns={columns} renderRow={renderRow} data={classesData}></Table>

      {/* PAGINATION  */}
      <Pagination></Pagination>
    </div>
  )
}

export default ClassListPage