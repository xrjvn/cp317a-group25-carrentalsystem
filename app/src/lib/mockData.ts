// /app/src/lib/mockData.ts
export type Reservation = {
  id: string;
  car: string;
  startDate: string;
  endDate: string;
  status: "active" | "cancelled";
};

export const mockStore: {
  user: { name: string; email: string; license: string };
  reservations: Reservation[];
} = {
  user: { name: "Test User", email: "testuser@example.com", license: "A1234-5678" },
  reservations: [
    { id: "r1", car: "Toyota Corolla", startDate: "2025-11-02", endDate: "2025-11-05", status: "active" },
    { id: "r2", car: "Honda Civic",   startDate: "2025-11-10", endDate: "2025-11-13", status: "active" },
  ],
};