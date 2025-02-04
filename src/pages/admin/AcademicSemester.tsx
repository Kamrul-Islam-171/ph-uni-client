import { useGetAllSemestersQuery } from "../../redux/features/admin/academicManagement.api";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TAcademicSemesterType } from "../../types/academicSemester.types";
import { useState } from "react";
import { TQueryParams } from "../../types/global";

// interface DataType {
//   key: React.Key;
//   name: string;
//   year: string;
//   startMonth: string;
//   endMonth: string;
// }


type  DataType =  Pick<TAcademicSemesterType, "name" | "_id" | "year" | "startMonth" | "endMonth">

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Fall",
        value: "Fall",
      },
      
    ],
    
  },
  
  {
    title: "Year",
    dataIndex: "year",
    // defaultSortOrder: "descend",
    // sorter: (a, b) => Number(a.year) - Number(b.year),
    filters: [
      {
        text: "2024",
        value: "2024",
      },
      {
        text: "2025",
        value: "2025",
      },
      
    ],
   
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
  }, 
  {
    title: "Action",
    dataIndex: "x",
    render: () => {
      return <div><Button>Update</Button></div>
    }
  }
];

const data = [
  {
    _id: "1",
    key:"1",
    name: "Autumn",
    year: "2024",
    startMonth: "January",
    endMonth: "March",
  },
  {
    _id: "2",
    key:"2",
    name: "Summer",
    year: "2024",
    startMonth: "April",
    endMonth: "June",
  },
  {
    _id: "3",
    key:"3",
    name: "Fall",
    year: "2024",
    startMonth: "August",
    endMonth: "December",
  },
  {
    _id: "4",
    key:"4",
    name: "Autumn",
    year: "2025",
    startMonth: "January",
    endMonth: "March",
  },
];


const AcademicSemester = () => {

  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  // const { data: semesterData } = useGetAllSemestersQuery([{name:'name', value:'Fall'}]);
  const { data: semesterData, isLoading, isFetching } = useGetAllSemestersQuery(params);

  // semester data theke just ei property gula lagbe
  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
    // console.log({filters, extra})
    if(extra.action === 'filter') {
      const queryParams : TQueryParams[] = [];
      filters.name?.forEach((item) => (
        queryParams.push({name:'name', value: item})
      ))
      filters.year?.forEach((item) => (
        queryParams.push({name:'year', value: item})
      ))
      // console.log({queryParams})
      setParams(queryParams)
    }
  };
  
  // console.log(data)
  return (
    <div>
      <Table<DataType>
        columns={columns}
        loading={isFetching}
        dataSource={data}
        // dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};



export default AcademicSemester;
