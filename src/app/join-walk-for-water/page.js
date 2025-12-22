import React from "react";
import Joinwalkwater from "./form";
import { formatTitle } from "@/app/utils/titleValidator";
export async function generateMetadata(req) {
  try {
    const host = req?.headers?.host || process.env.NEXT_PUBLIC_BASE_URL;
    const pathName = `${host}`;

    
  } catch (error) {
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    
  }
}
export default function Page() {
  return <Joinwalkwater />;
}
