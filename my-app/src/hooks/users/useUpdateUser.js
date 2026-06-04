import useMutation from "../shared/useMutation";
import { updateUser } from "../../api/userService";

export default function useUpdateUser() {
  return useMutation(updateUser);
}
