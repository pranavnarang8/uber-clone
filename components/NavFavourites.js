import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setOrigin,
} from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const NavFavourites = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const data = [
    {
      id: "123",
      icon: "home",
      location: "Home",
      destination: "Siddha Xanadu",
    },
    {
      id: "456",
      icon: "briefcase",
      location: "Work",
      destination: "PwC DN Block, Sector-V",
    },
  ];
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.6 }]} />
      )}
      renderItem={({ item: { id, icon, location, destination }, item }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
          onPress={() => {
            setSelected(item);
            if (!origin) {
              if (selected?.id === id) {
                console.log(selected);
                dispatch(
                  setOrigin({
                    location: { lat: 22.6339522, lng: 88.4659162 },
                    description:
                      "Siddha Xanadu Condominium, Bablatala, Rajarhat, Kolkata, West Bengal, India",
                  })
                );
              } else {
                console.log(selected?.id + " need to work");
                dispatch(
                  setOrigin({
                    location: { lat: 22.5773062, lng: 88.4294458 },
                    description:
                      "PWC, DN Block, Sector V, Bidhannagar, Kolkata, West Bengal, India",
                  })
                );
              }

              navigation.navigate("MapScreen");
            } else {
              if (origin?.location?.lat === 22.5773062) {
                console.log(selected?.id);
                dispatch(
                  setDestination({
                    location: { lat: 22.6339522, lng: 88.4659162 },
                    description:
                      "Siddha Xanadu Condominium, Bablatala, Rajarhat, Kolkata, West Bengal, India",
                  })
                );
              } else {
                console.log(selected?.id);
                dispatch(
                  setDestination({
                    location: { lat: 22.5773062, lng: 88.4294458 },
                    description:
                      "PWC, DN Block, Sector V, Bidhannagar, Kolkata, West Bengal, India",
                  })
                );
              }

              navigation.navigate("RideOptionsCard");
              setSelected(null);
            }
          }}
        >
          <Icon
            style={tw`mr-4 rounded full bg-gray-400 p-3`}
            name={item.icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500`}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
