import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Row,
  Col,
  Radio,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setData, addData, editData, deleteData } from "../../store/formSlice";
import { ColumnType } from "antd/es/table";
import {
  loadDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../../services/localStorageService";

import styles from "../../styles/page.module.scss";
import { FormData } from "../../store/types";
import Flag from "react-world-flags";
import dayjs from "dayjs";
import { useI18n } from "@/hooks/useI18n";

const FormTable = () => {
  const { Option } = Select;
  const { t } = useI18n();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.data);
  const [editingData, setEditingData] = useState<FormData | null>(null);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedItems, setSelectedItems] = useState<FormData[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const data = loadDataFromLocalStorage();
    dispatch(setData(data));
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteData(id));
    const updatedData = formData.filter((item) => item.id !== id);
    saveDataToLocalStorage(updatedData);
    alert("delete success!");
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      alert("Please select items to delete!");
      return;
    }

    selectedItems.forEach((item) => dispatch(deleteData(item.id)));

    const updatedData = formData.filter(
      (item) => !selectedItems.map((selected) => selected.id).includes(item.id)
    );

    saveDataToLocalStorage(updatedData);

    setSelectedItems([]);

    alert("Selected items deleted successfully!");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  const handleSubmit = (values: FormData) => {
    const fullCitizenID = `${citizenID.part1}${citizenID.part2}${citizenID.part3}${citizenID.part4}${citizenID.part5}`;
    const valuesWithCitizenID = {
      ...values,
      citizenID: fullCitizenID,
    };

    if (editingData) {
      dispatch(editData({ ...valuesWithCitizenID, id: editingData.id }));
      alert("update success!");
      handleReset();
    } else {
      dispatch(addData({ ...valuesWithCitizenID, id: Date.now() }));
      alert("save success!");
      handleReset();
    }

    const updatedData = editingData
      ? formData.map((item) =>
          item.id === editingData.id
            ? { ...valuesWithCitizenID, id: editingData.id }
            : item
        )
      : [...formData, { ...valuesWithCitizenID, id: Date.now() }];
    saveDataToLocalStorage(updatedData);
    setEditingData(null);
  };

  const handleEdit = (record: FormData) => {
    const formattedBirthday = record.birthday ? dayjs(record.birthday) : null;

    setCitizenID({
      part1: record.citizenID?.slice(0, 1) || "",
      part2: record.citizenID?.slice(1, 5) || "",
      part3: record.citizenID?.slice(5, 10) || "",
      part4: record.citizenID?.slice(10, 12) || "",
      part5: record.citizenID?.slice(12, 13) || "",
    });

    setEditingData({
      ...record,
      citizenID: `${citizenID.part1}${citizenID.part2}${citizenID.part3}${citizenID.part4}${citizenID.part5}`,
      birthday: formattedBirthday,
    });

    form.setFieldsValue({
      ...record,
      birthday: formattedBirthday,
    });
  };

  const [citizenID, setCitizenID] = useState({
    part1: "",
    part2: "",
    part3: "",
    part4: "",
    part5: "",
  });

  const maxLength: Record<keyof typeof citizenID, number> = {
    part1: 1,
    part2: 4,
    part3: 5,
    part4: 2,
    part5: 1,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    part: keyof typeof citizenID
  ) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 5) {
      setCitizenID((prev) => ({
        ...prev,
        [part]: value,
      }));

      if (value.length === maxLength[part] && part !== "part5") {
        const nextPart = `part${parseInt(part.replace("part", "")) + 1}`;
        const nextPartElement = document.getElementById(nextPart);
        if (nextPartElement) {
          nextPartElement.focus();
        }
      }
    }
  };

  const handleReset = () => {
    setCitizenID({
      part1: "",
      part2: "",
      part3: "",
      part4: "",
      part5: "",
    });
    setEditingData(null);
    setTimeout(() => {
      form.resetFields();
    }, 0);
  };

  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: FormData[]) => {
      setSelectedItems(selectedRows);
    },

    selectedRowKeys: selectedItems.map((item) => item.id),
  };

  const handleSelectAll = () => {
    if (selectedItems.length === formData.length) {
      setSelectedItems([]);
    } else {
      const allItemIds = formData.map((item) => item.id);
      setSelectedItems(formData.filter((item) => allItemIds.includes(item.id)));
    }
  };

  const ColDash = () => (
    <Col span={1} className={styles["input-dash"]}>
      <div>-</div>
    </Col>
  );

  const columns: ColumnType<FormData>[] = [
    {
      title: t("form.name"),
      key: "name",
      render: (_: string, record: FormData) =>
        `${record.firstname} ${record.lastname}`,
      sorter: (a, b) => {
        return (a.firstname + a.lastname).localeCompare(
          b.firstname + b.lastname
        );
      },
    },
    {
      title: t("form.gender"),
      dataIndex: "gender",
      key: "gender",
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: t("form.mobilePhone"),
      dataIndex: "mobilePhone",
      key: "mobilePhone",
      render: (_: string, record: FormData) =>
        `${record.countryCode}${record.phoneNumber}`,
      sorter: (a, b) => {
        return (a.countryCode + a.phoneNumber).localeCompare(
          b.countryCode + b.phoneNumber
        );
      },
    },
    {
      title: t("form.nationality"),
      dataIndex: "nationality",
      key: "nationality",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: t("form.manage"),
      key: "manage",
      render: (_: string, record: FormData) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>{t("form.edit")}</Button>
          <Button onClick={() => handleDelete(record.id)} type="primary" danger>
            {t("form.delete")}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2>{editingData ? t("form.editRecord") : t("form.addNewRecord")}</h2>
        <Form
          form={form}
          initialValues={editingData || {}}
          onFinish={handleSubmit}
        >
          <Row gutter={16} className={styles["row-spacing"]}>
            <Col span={4}>
              <Form.Item
                name="title"
                label={t("form.title")}
                rules={[{ required: true, message: t("form.errorTitle") }]}
              >
                <Select placeholder={t("form.title")}>
                  <Option value="Mr">{t("form.mr")}</Option>
                  <Option value="Ms">{t("form.ms")}</Option>
                  <Option value="Mrs">{t("form.mrs")}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="firstname"
                label={t("form.firstName")}
                rules={[{ required: true, message: t("form.errorFirstName") }]}
              >
                <Input
                  onFocus={(event) => {
                    event.target.setAttribute("autocomplete", "off");
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="lastname"
                label={t("form.lastName")}
                rules={[{ required: true, message: t("form.errorLastName") }]}
              >
                <Input
                  onFocus={(event) => {
                    event.target.setAttribute("autocomplete", "off");
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} className={styles["row-spacing"]}>
            <Col span={6}>
              <Form.Item
                name="birthday"
                label={t("form.birthday")}
                rules={[{ required: true, message: t("form.errorBirthday") }]}
              >
                <DatePicker format={"MM/DD/YY"} placeholder="mm//dd//yy" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nationality"
                label={t("form.nationality")}
                rules={[
                  {
                    required: true,
                    message: t("form.errorNationality"),
                  },
                ]}
              >
                <Select>
                  <Option value="Thai">{t("form.thai")}</Option>
                  <Option value="Other">{t("form.other")}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} className={styles["row-spacing"]}>
            <Form.Item
              name="citizenID"
              label={t("form.citizenID")}
              style={{ paddingLeft: "12px" }}
            >
              <Space.Compact>
                <Row gutter={8}>
                  <Col span={2}>
                    <Input
                      id="part1"
                      value={citizenID.part1}
                      onChange={(e) => handleChange(e, "part1")}
                      maxLength={1}
                      inputMode="numeric"
                    />
                  </Col>
                  <ColDash />
                  <Col span={4}>
                    <Input
                      id="part2"
                      value={citizenID.part2}
                      onChange={(e) => handleChange(e, "part2")}
                      maxLength={4}
                      inputMode="numeric"
                    />
                  </Col>
                  <ColDash />
                  <Col span={4}>
                    <Input
                      id="part3"
                      value={citizenID.part3}
                      onChange={(e) => handleChange(e, "part3")}
                      maxLength={5}
                      inputMode="numeric"
                    />
                  </Col>
                  <ColDash />
                  <Col span={3}>
                    <Input
                      id="part4"
                      value={citizenID.part4}
                      onChange={(e) => handleChange(e, "part4")}
                      maxLength={2}
                      inputMode="numeric"
                    />
                  </Col>
                  <ColDash />
                  <Col span={2}>
                    <Input
                      id="part5"
                      value={citizenID.part5}
                      onChange={(e) => handleChange(e, "part5")}
                      maxLength={1}
                      inputMode="numeric"
                    />
                  </Col>
                </Row>
              </Space.Compact>
            </Form.Item>
          </Row>

          <Form.Item
            name="gender"
            label={t("form.gender")}
            rules={[{ required: true, message: t("form.errorGender") }]}
          >
            <Radio.Group>
              <Radio value="Male">{t("form.male")}</Radio>
              <Radio value="Female">{t("form.female")}</Radio>
              <Radio value="Unsex">{t("form.unsex")}</Radio>
            </Radio.Group>
          </Form.Item>

          <Row gutter={8} className={styles["row-spacing"]}>
            <Col span={6}>
              <Form.Item
                name="countryCode"
                label={t("form.mobilePhone")}
                rules={[
                  {
                    required: true,
                    message: t("form.errorCountryCode"),
                  },
                ]}
              >
                <Select>
                  <Option value="+66">
                    <Flag
                      code="TH"
                      style={{ width: "20px", marginRight: "8px" }}
                    />
                    +66
                  </Option>
                  <Option value="+1">
                    <Flag
                      code="US"
                      style={{ width: "20px", marginRight: "8px" }}
                    />
                    +1
                  </Option>
                  <Option value="+33">
                    <Flag
                      code="FR"
                      style={{ width: "20px", marginRight: "8px" }}
                    />
                    +33
                  </Option>
                </Select>
              </Form.Item>
            </Col>

            <div
              style={{
                paddingLeft: "14px",
                paddingRight: "10px",
                marginTop: "5px",
              }}
            >
              <ColDash />
            </div>

            <Col span={8}>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: t("form.errorPhoneNumber"),
                  },
                ]}
              >
                <Input
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  inputMode="numeric"
                  onFocus={(event) => {
                    event.target.setAttribute("autocomplete", "off");
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} className={styles["row-spacing"]}>
            <Col span={9}>
              <Form.Item name="passportNo" label={t("form.passportNo")}>
                <Input
                  maxLength={7}
                  pattern="[A-Za-z0-9]{7}"
                  inputMode="text"
                  onFocus={(event) => {
                    event.target.setAttribute("autocomplete", "off");
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} className={styles["row-spacing"]}>
            <Col span={14}>
              <Row gutter={16} className={styles["row-spacing"]}>
                <Col span={16}>
                  <Form.Item
                    name="expectedSalary"
                    label={t("form.expectedSalary")}
                    rules={[
                      {
                        required: true,
                        message: t("form.errorExpectedSalary"),
                      },
                    ]}
                  >
                    <Input
                      inputMode="numeric"
                      onFocus={(event) => {
                        event.target.setAttribute("autocomplete", "off");
                      }}
                      maxLength={10}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={4}>
              <Button className={styles.formButton} onClick={handleReset}>
                {t("form.reset")}
              </Button>
            </Col>
            <Col span={4}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.formButton}
                >
                  {editingData ? t("form.update") : t("form.submit")}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <div className={styles.rowSelectAll}>
        <Checkbox
          checked={
            selectedItems.length === formData.length &&
            selectedItems.length != 0
          }
          onChange={handleSelectAll}
        >
          {t("form.selectAll")}
        </Checkbox>
        <Button className={styles.formButton} onClick={handleDeleteSelected}>
          {t("form.delete")}
        </Button>
      </div>

      <div className={styles.tableContainer}>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={formData}
          pagination={{
            position: ["topRight"],
            current: currentPage,
            pageSize: 3,
            onChange: handlePageChange,
            showSizeChanger: false,
            total: formData.length,
            showPrevNextJumpers: true,
            itemRender: (_, type, originalElement) => {
              if (type === "prev") {
                return <a>{t("form.prev")}</a>;
              }
              if (type === "next") {
                return <a>{t("form.prev")}</a>;
              }
              return originalElement;
            },
          }}
        />
      </div>
    </div>
  );
};

export default FormTable;
