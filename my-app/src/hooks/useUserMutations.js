import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, updateUser, deleteUser } from "../api/userService";

export default function useUserMutations() {
  const queryClient = useQueryClient();
  // ADD USER
  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (oldUsers = []) => [
        newUser,
        ...oldUsers,
      ]);
    },
  });

  // UPDATE USER
  const updateUserMutation = useMutation({
    mutationFn: ({ id, userData }) => updateUser(id, userData),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (oldUsers = []) =>
        oldUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        ),
      );
    },
  });

  // DELETE USER
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, deletedUserId) => {
      queryClient.setQueryData(["users"], (oldUsers = []) =>
        oldUsers.filter((user) => user.id !== deletedUserId),
      );
    },
  });

  return {
    addUserMutation,
    updateUserMutation,
    deleteUserMutation,
  };
}
