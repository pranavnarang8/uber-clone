import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectDestination,
  selectTravelTimeInformation,
} from "../slices/navSlice";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { useState } from "react";

const RideOptionsCard = () => {
  const destination = useSelector(selectDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const data = [
    {
      id: "Uber_Go",
      title: "Uber Go",
      multiplier: 1,
      image: "https://links.papareact.com/3pn",
    },
    {
      id: "Uber_Lux",
      title: "Uber Lux",
      multiplier: 1.2,
      image: "https://links.papareact.com/7pf",
    },
    {
      id: "Uber_XL",
      title: "Uber XL",
      multiplier: 1.7,
      image: "https://links.papareact.com/5w8",
    },
  ];

  const SURGE_CHARGE_RATE = 1.5;
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw``}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-1 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-3 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-8 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <SafeAreaView style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </SafeAreaView>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-rs", {
                style: "currency",
                currency: "INR",
              }).format(
                (travelTimeInformation?.duration?.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  8
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View stylele={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          style={tw`bg-black py-2 mx-3 ${!selected && "bg-gray-300"}`}
          disabled={!selected}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
