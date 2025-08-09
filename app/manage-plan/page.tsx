"use client";

import React from "react";
import SchematicComponent from "@/components/schematic/SchematicComponent";

export default function ManagePlan() {

  
  <div>
    
  </div>
  const componentId =
    process.env.NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID;

  if (!componentId) return <p>Missing component ID</p>;

  return <SchematicComponent componentId={componentId} />;
  
}
