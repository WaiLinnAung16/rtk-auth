import { Table } from "@mantine/core";
import Cookies from "js-cookie";
import React from "react";
import { useGetContactQuery } from "../redux/api/contactApi";

const ContactTable = () => {
  //   const token = Cookies.get("token");
  //   const { data } = useGetContactQuery(token);
  //   console.log(data);
  return (
    <div className="mt-10">
      <Table>
        <thead>
          <tr>
            <th>Element position</th>
            <th>Element name</th>
            <th>Symbol</th>
            <th>Atomic mass</th>
          </tr>
        </thead>
        {/* <tbody>{rows}</tbody> */}
      </Table>
    </div>
  );
};

export default ContactTable;
