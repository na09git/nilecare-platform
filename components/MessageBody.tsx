"use client";
import parse from "html-react-parser";

import React from "react";

export default function MessageBody({ html }: { html: string }) {
  return <div className="parsed-html">{parse(`${html}`)}</div>;
}

{
  /* <div className="prose">{parse(`${html}`)}</div>; */
}
