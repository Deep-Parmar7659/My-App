import useMutation from "../useMutation";

import { updateUser } from "../services/api";

export default function useUpdateUser() {
  return useMutation(updateUser);
}
