import { useEffect, useState } from "react";
import API from "../api/axios";

function MyMedicineReservations() {
  const [reservations, setReservations] =
    useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const { data } =
        await API.get(
          "/medicines/my-reservations"
        );

      setReservations(
        data.reservations
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        My Medicine Reservations
      </h1>

      {reservations.length === 0 ? (
        <p>
          No reservations found
        </p>
      ) : (
        reservations.map(
          (reservation) => (
            <div
              key={
                reservation._id
              }
              style={{
                border:
                  "1px solid #ccc",
                padding:
                  "15px",
                marginBottom:
                  "10px",
                borderRadius:
                  "10px",
              }}
            >
              <h3>
                {
                  reservation
                    .medicine
                    ?.name
                }
              </h3>

              <p>
                Pharmacy:
                {" "}
                {
                  reservation
                    .pharmacy
                    ?.name
                }
              </p>

              <p>
                Quantity:
                {" "}
                {
                  reservation.quantity
                }
              </p>

             <p>
 Status:
 <strong>
 {reservation.status}
 </strong>
</p>

{reservation.message && (

 <p>
  Message:
  {
   reservation.message
  }
 </p>

)}

              {reservation.message && (
                <p>
                  Message:
                  {" "}
                  {
                    reservation.message
                  }
                </p>
              )}
            </div>
          )
        )
      )}
    </div>
  );
}

export default MyMedicineReservations;