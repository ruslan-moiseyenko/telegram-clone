import React from "react";
import { Redirect } from "expo-router";

export default function HomePage() {
  return <Redirect href="/(auth)/login" />;
}
