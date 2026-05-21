import useMutation from "./useMutation";

import { deleteUser } from "../services/api";

export default function useDeleteUser() {
  return useMutation(deleteUser);
}
