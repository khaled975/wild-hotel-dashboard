import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const {data:cabins,isLoading} = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  console.log(cabins);
  
  if(isLoading) return <Spinner/>
  if (!cabins.length) return <Empty resource={"cabins"} />;

  // 1) FILTER
  const filteredValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filteredValue === "all") filteredCabins = cabins;

  if (filteredValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filteredValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  // console.log(filteredCabins);

  // 2) SORT
  const sortedValue = searchParams.get("sort") || "startDate-asc";
  const [sortField, direction] = sortedValue.split("-");
  const directionChanger = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    // ==>>>> EX OF SORTING BY PRICE
    // (a, b) => (a.price - b.price) * directionChanger
    (a, b) => (a[sortField] - b[sortField]) * directionChanger
  );

  // console.log(directionChanger, sortedCabins);

  return (
    <Menus>
      <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Table.Body>
          {sortedCabins.map((cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          ))}
        </Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
