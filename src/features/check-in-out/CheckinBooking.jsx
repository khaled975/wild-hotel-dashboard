import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/UseBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  // state to check if user checked in or not
  const [confirmPaid, setConfirmPaid] = useState(false);
  // STATE TO CHECK IF USER WANT TO ADD BREAKFAST OR NOT
  const [addBreakfast, setAddBreakfast] = useState(false);
  // GO BACK
  const moveBack = useMoveBack();
  // GET BOOKING DATA
  const { booking, isLoading } = useBooking();
  // CHECK IN FOR UNCONFIRMED USERS
  const { checkingBooking, isChecking } = useCheckin();
  // GET SETTINGS DATA "BREAKFAST_PRICE"
  const { settings } = useSettings();

  // console.log(settings);

  useEffect(() => setConfirmPaid(booking?.at(0)?.isPaid || false), [booking]);
  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    guestsNum,
    hasBreakfast,
    nightsNum,
  } = booking[0];

  const totalBookingBreakfastPrice =
    settings?.breakfastPrice * guestsNum * nightsNum;

  function handleCheckin() {
    if (!confirmPaid) return;
    console.log(isChecking);

    checkingBooking({
      bookingId,
      breakfast: {
        hasBreakfast: true,
        extraPrice: totalBookingBreakfastPrice,
        totalPrice: totalBookingBreakfastPrice + totalPrice,
      },
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((pre) => !pre);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            I want to add a breakfast to my booking for{" "}
            {formatCurrency(totalBookingBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id={bookingId}
          disabled={confirmPaid}
        >
          i confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + totalBookingBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                totalBookingBreakfastPrice
              )} )`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isChecking}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
