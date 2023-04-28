import { Table, Typography } from "antd";
import "./App.css";
// import data from "./data.json";
import { useEffect, useState } from "react";
import axios from "axios";

const columns = [
  {
    title: "ComputerName",
    dataIndex: "ComputerName",
    key: "ComputerName",
  },
  {
    title: "EventType",
    dataIndex: "EventType",
    key: "EventType",
  },
  {
    title: "EventCode",
    dataIndex: "EventCode",
    key: "EventCode",
  },
  {
    title: "Keywords",
    dataIndex: "Keywords",
    key: "Keywords",
  },
  {
    title: "LogName",
    dataIndex: "LogName",
    key: "LogName",
  },
  {
    title: "Message",
    dataIndex: "Message",
    key: "Message",
  },
  {
    title: "RecordNumber",
    dataIndex: "RecordNumber",
    key: "RecordNumber",
  },
  {
    title: "Type",
    dataIndex: "Type",
    key: "Type",
  },
  {
    title: "_indextime",
    dataIndex: "_indextime",
    key: "_indextime",
  },
  {
    title: "SourceName",
    dataIndex: "SourceName",
    key: "SourceName",
  },
  {
    title: "_time",
    dataIndex: "_time",
    key: "_time",
  },
  {
    title: "_pre_msg",
    dataIndex: "_pre_msg",
    key: "_pre_msg",
  },
];

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("http://10.50.3.159:5000/data");

        console.log(res);

        setData(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  return (
    <div className="App">
      <Typography.Title className="text-center my-4">
        Splunk Windows Logs
      </Typography.Title>
      <section className="w-full flex flex-col gap-2">
        <section className="px-8">
          <Table dataSource={data} columns={columns} />
        </section>
      </section>
    </div>
  );
}

export default App;
