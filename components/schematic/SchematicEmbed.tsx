"use client";

import {
  EmbedProvider,
  SchematicEmbed as SchematicEmbedComponent,
} from "@schematichq/schematic-components";

export default function PortalEmbed({
  componentId,
  token,
}: {
  componentId?: string;
  token: string;
}) {
  if (!componentId) return null;

  return (
    <EmbedProvider>
      <SchematicEmbedComponent id={componentId} accessToken={token} />
    </EmbedProvider>
  );
}