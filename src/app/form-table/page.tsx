"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import FormTable from "./components/container/FormTable";

const FormTablePage = () => {
  return (
    <Provider store={store}>
      <FormTable />
    </Provider>
  );
};

export default FormTablePage;
