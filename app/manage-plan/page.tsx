import React from "react";
import PortalEmbed from "@/components/schematic/SchematicEmbed";
import { getTemporaryAccessToken } from "@/actions/getTemporaryAccessToken";

export default async function ManagePlan() {
  const token = await getTemporaryAccessToken();
  return (
    <div className="container xl:max-w-5xl mx-auto p-4 md:p-0">
      <h1 className="text-2xl font-bold mb-4 my-8">Manage Your Plan</h1>
      <p className="text-gray-600 mb-8">
        Manage your subscription and billing details here.
      </p>
      <PortalEmbed
        componentId={process.env.NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID!}
        token={token!}
      />
    </div>
  );
}
