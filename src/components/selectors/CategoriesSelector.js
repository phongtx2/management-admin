import { Select } from "antd";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/product";

export const CategoriesSelector = ({ name, onChange, value }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await getCategories();
      setCategories(data.categories);
      setLoading(false);
    })();
  }, []);

  return (
    <Select
      name={name}
      loading={loading}
      style={{ width: "100%" }}
      placeholder="Select a category"
      onChange={onChange}
      value={value}>
      {categories?.map((category) => (
        <Select.Option key={category.id} value={category.id}>
          {category.name}
        </Select.Option>
      ))}
    </Select>
  );
};
