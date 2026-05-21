import useMutation from "./useMutation";
import { createUser } from "../api/userApi";

export default function useCreateUser() {
  return useMutation(createUser);
}
