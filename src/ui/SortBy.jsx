import { useSearchParams } from "react-router-dom";
import Select from "./Select";

// const options = [
//   { value: "name-asc", label: "Sort by name (A-Z)" },
//   { value: "name-desc", label: "Sort by name (Z-A)" },
//   { value: "regularPrice-asc", label: "Sort by price (low first)" },
//   { value: "regularPrice-desc", label: "Sort by price (high first)" },
//   { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
//   { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
// ];

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort") || "";
  function handleChange(e) {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <div>
      <Select
        options={options}
        onChange={handleChange}
        value={sortBy}
        type="white"
      />
    </div>
  );
}

export default SortBy;
