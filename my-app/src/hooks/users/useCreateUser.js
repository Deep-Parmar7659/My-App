import useMutation from "../useMutation";
import { createUser } from "../services/api";

export default function useCreateUser() {
  return useMutation(createUser);
}
