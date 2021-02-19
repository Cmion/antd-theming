import React from "react";
import MicroComponents from "./Components";
// import DataTable from "./DataTable";
import Calendar from "../Items/Calender";
import Desc from "../Items/Desc";
import Img from "../Items/Img";
import List from "../Items/List";
import RTable from "../Items/RTable";

import { Router } from "@reach/router";

export default () => {
  return (
    <Router primary={false}>
      <MicroComponents path="/" />
      <RTable path="/table" />
      <Calendar path={"/calendar"} />
      <Desc path={"/desc"} />
      <Img path={"/images"} />
      <List path={"/list"} />
      {/*<NotFound default />*/}
    </Router>
  );
};
