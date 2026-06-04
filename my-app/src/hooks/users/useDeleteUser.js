import useMutation from "../shared/useMutation";
import { deleteUser } from "../../api/userService";

export default function useDeleteUser() {
  return useMutation(deleteUser);
}
