import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/app/data/reservations.json");

function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
  }
}

function loadReservations() {
  ensureFile();
  const raw = fs.readFileSync(filePath, "utf-8").trim();
  if (!raw) return [];

  let data = JSON.parse(raw);

  return data.map((r: any) => ({
    ...r,
    status: r.status ?? "active",
  }));
}

function saveReservations(reservations: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(reservations, null, 2), "utf-8");
}

//Get all reservations
export async function GET() {
    const reservations = loadReservations();
    return NextResponse.json(reservations);
}

//Post new reservation
export async function POST(req: Request) {
  try {
    const body = await req.json(); // { name, email, carId, pickupDate, returnDate, id? }

    const reservations = loadReservations();

    const newReservation = {
      ...body,
      id: body.id ?? Date.now().toString(),
      status: "active",              // ⭐ new reservations are active
    };

    reservations.push(newReservation);
    saveReservations(reservations);

    return NextResponse.json({ reservation: newReservation }, { status: 201 });
  } catch (err) {
    console.error("POST /api/reservations error:", err);
    return NextResponse.json({ error: "Failed to add reservation" }, { status: 500 });
  }
}
//Update a reservation (cancel, modify, etc.)
export async function PUT(req: Request) {
  try {
    const { id, status, ...rest } = await req.json(); // we care about id + status

    let reservations = loadReservations();

    reservations = reservations.map((r: any) =>
      r.id === id
        ? {
            ...r,
            ...rest,
            status: status ?? r.status,  // ⭐ update status if provided
          }
        : r
    );

    saveReservations(reservations);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/reservations error:", err);
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
  }
}

// Delete reservation
export async function DELETE(req: Request) {
    const { id } = await req.json();
    let reservations = loadReservations();
    reservations = reservations.filter(r => r.id !== id);
    saveReservations(reservations);

    return NextResponse.json({ message: "Reservation removed" });
}