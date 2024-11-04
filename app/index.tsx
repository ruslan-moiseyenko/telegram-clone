import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

export default function HomePage() {
  return <Redirect href="/(home)/(tabs)" />;
}

const styles = StyleSheet.create({});
