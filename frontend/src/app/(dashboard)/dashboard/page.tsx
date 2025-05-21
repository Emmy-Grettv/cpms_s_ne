/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  const { user } = useAuth();

  if (!user) return <div className="text-center mt-20 text-sky-600">Loading...</div>;

  const isAdmin = user.role === "admin";

  return (
    <div className="min-h-screen bg-white px-4 py-12 md:px-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-sky-600">
          Welcome, {isAdmin ? "Admin" : ""} {user.firstName}!
        </h1>

        <div
          className={`grid gap-6 ${
            isAdmin ? "grid-cols-1 md:grid-rows-3" : "grid-cols-1 md:grid-rows-2"
          }`}
        >
          {/* Cards for Admin */}
          {isAdmin && (
            <>
              <DashboardCard
                href="/parking-slots"
                title="Parking Slot Management"
                description="Add, edit, or remove parking slots."
              />
              <DashboardCard
                href="/car-entries"
                title="Car Entries/Exits"
                description="View and manage car entries and exits."
              />
              <DashboardCard
                href="/reports"
                title="Reports"
                description="Generate and view parking reports."
              />
            </>
          )}

          {/* Cards for User */}
          {!isAdmin && (
            <>
              <DashboardCard
                href="/car-entries"
                title="Register Car Entry/Exit"
                description="Register incoming and outgoing cars in the parking."
              />
              <DashboardCard
                href="/parking-slots"
                title="View Parking Slots"
                description="View available parking slots and fees."
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type DashboardCardProps = {
  href: string;
  title: string;
  description: string;
};

function DashboardCard({ href, title, description }: DashboardCardProps) {
  return (
    <Link href={href}>
      <Card className="transition duration-200 hover:shadow-lg border hover:bg-sky-50 cursor-pointer">
        <CardHeader>
          <CardTitle className="text-sky-600 text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">{description}</CardContent>
      </Card>
    </Link>
  );
}
