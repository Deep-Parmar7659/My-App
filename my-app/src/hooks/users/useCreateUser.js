import useMutation from "../shared/useMutation";
import { addUser } from "../../api/userService";

export default function useCreateUser() {
  return useMutation(addUser);
}
