import { useEffect, useState } from "react";
import API from "../api/axios";

function MedicineAnalytics() {
  const [data, setData] =
    useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics =
    async () => {
      try {
        const res =
          await API.get(
            "/admin/medicine-analytics"
          );

        setData(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (!data) {
    return (
      <h3>
        Loading Medicine
        Analytics...
      </h3>
    );
  }

  return (
    <div
      style={{
        marginTop: "40px",
      }}
    >
      <h2>
        Medicine Analytics
      </h2>

      <div>
        Total Medicines:
        {" "}
        {
          data.totalMedicines
        }
      </div>

      <div>
        Low Stock:
        {" "}
        {
          data.lowStockCount
        }
      </div>

      <div>
        Out Of Stock:
        {" "}
        {
          data.outOfStockCount
        }
      </div>
    </div>
  );
}

export default MedicineAnalytics;