import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Search = ({ search, setSearch }) => {
	const handleSearch = (e) => setSearch(e.target.value);

	return (
		<Input
			placeholder="Search category"
			allowClear
			className="mb-3"
			value={search}
			onChange={handleSearch}
			prefix={<SearchOutlined />}
		/>
	);
};

export default Search;
