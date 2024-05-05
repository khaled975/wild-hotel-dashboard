import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { PAGE_RESULTS_SIZE } from "../../utils/constants";

function BookingTable() {
  const [searchParams] = useSearchParams();
  const {
    data: bookings,
    isLoading,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resource={"bookings"} />;

  // FILTER
  const filteredValue = searchParams.get("status") || "all";
  let filteredBookings;
  if (filteredValue === "all") filteredBookings = bookings;
  if (filteredValue === "checked-out")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-out"
    );
  if (filteredValue === "checked-in")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-in"
    );
  // setSearchParams({ page: 1, status: "checked-in" });
  // console.log(searchParams.get("status"));

  if (filteredValue === "unconfirmed")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "unconfirmed"
    );

  // SORT
  const sortedValue = searchParams.get("sort") || "startDate-desc";
  // const date = new Date();
  const [sortField, direction] = sortedValue.split("-");
  console.log(sortField, direction);

  const directionChanger = direction === "asc" ? 1 : -1;
  const sortedBookings = filteredBookings.sort(
    (a, b) => {
      // setSearchParams({ page: 1 });

      return (
        (new Date(a[sortField]) - new Date(b[sortField])) * directionChanger
      );
    }
    // (a, b) => console.log(a)
  );
  console.log(sortedBookings);

  // PAGINATION
  //  GET THE CURRENT PAGE OF PAGINATION
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const from = (currentPage - 1) * PAGE_RESULTS_SIZE;
  const to = currentPage * PAGE_RESULTS_SIZE;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body>
          {/* at the first BEFORE =>> filter & sort */}
          {/* {bookings.map((booking) => ( */}
          {/* After filter =>> filter */}
          {/* {filteredBookings.map((booking) => ( */}
          {/* After sort =>> filter & sort */}
          {sortedBookings.slice(from, to).map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </Table.Body>

        <Table.Footer>
          <Pagination
            resultsCount={sortedBookings.length}
            resultsRange={{ from, to }}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
