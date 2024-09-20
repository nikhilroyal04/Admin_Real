import React, { useEffect } from "react";
import {
  fetchuserData,
  selectuserData,
  selectuserError,
  selectuserLoading,
} from "../../app/Slices/menuSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Not_Found/Loader";
import Error502 from "../Not_Found/Error502";
import { Text } from "@chakra-ui/react";
import consoleManager from "../../utils/consoleManager";

export default function UserList() {
  const dispatch = useDispatch();
  const userData = useSelector(selectuserData);
  const isLoading = useSelector(selectuserLoading);
  const error = useSelector(selectuserError);

  useEffect(() => {
    dispatch(fetchuserData());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error502 />;
  }

  if (userData.length === 0) {
    consoleManager.log("No user data found");
  }

  consoleManager.log("User data:", userData);
  consoleManager.error("User error:", error);

  return (
    <Text
      fontSize="2xl"
      fontWeight="bold"
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="60vh"
      color="blue.500"
    >
      {userData}
    </Text>
  );
}
