"use client";

import React, { useEffect, useState } from "react";
import { getTemporaryAccessToken } from "@/actions/getTemporaryAccessToken";
import {
  EmbedProvider,
  SchematicEmbed as SchematicEmbedComponent,
} from "@schematichq/schematic-components";

export default function SchematicComponent({
  componentId,
}: {
  componentId: string;
}) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // call the server action
    getTemporaryAccessToken()
      .then((t) => {
        if (!t) throw new Error("No access token found for user");
        setToken(t);
      })
      .catch((err) => {
        console.error("Token fetch error:", err);
      });
  }, []);

  // don’t render anything until we have both
  if (!componentId || !token) {
    return null;
  }

  return (
    <SchematicEmbedComponent id={componentId} accessToken={token} />
  );
}
