"use client";

import { SchematicEmbed as SchematicEmbedComponent } from "@schematichq/schematic-components";


function SchematicEmbed({
    accessToken,
    componentId,
}: {
    accessToken: string;
    componentId: string;
}) {
    return <SchematicEmbedComponent accessToken={accessToken} id={componentId} />;
}

export default SchematicEmbed;