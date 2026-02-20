import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        service: true,
        employee: true,
        client: true,
      },
      orderBy: {
        date: "asc",
      },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching appointments" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(body.date),
        status: "PENDING",
        businessId: body.businessId,
        serviceId: body.serviceId,
        employeeId: body.employeeId,
        clientId: body.clientId,
        notes: body.notes,
      },
    });
    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating appointment" },
      { status: 400 },
    );
  }
}
