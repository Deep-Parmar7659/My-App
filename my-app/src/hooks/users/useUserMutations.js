import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, updateUser, deleteUser } from "../../api/userService";
import toast from "react-hot-toast";

export default function useUserMutations() {
  const queryClient = useQueryClient();

  // ADD USER
  const addUserMutation = useMutation({
    mutationFn: addUser,

    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousData = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old) => {
        const users = old?.users || [];
        return { ...old, users: [newUser, ...users] };
      });

      return { previousData };
    },

    onError: (_error, _newUser, context) => {
      queryClient.setQueryData(["users"], context.previousData);
      toast.error("Failed to add user");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // UPDATE USER
  const updateUserMutation = useMutation({
    mutationFn: ({ id, userData }) => updateUser(id, userData),

    onMutate: async ({ id, userData }) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousData = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old) => {
        const users = old?.users || [];
        return {
          ...old,
          users: users.map((user) =>
            user.id === id ? { ...user, ...userData } : user
          ),
        };
      });

      return { previousData };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["users"], context.previousData);
      toast.error("Failed to update user");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // DELETE USER
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,

    onMutate: async (deletedUserId) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousData = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old) => {
        const users = old?.users || [];
        return {
          ...old,
          users: users.filter((user) => user.id !== deletedUserId),
        };
      });

      return { previousData };
    },

    onError: (_error, _deletedUserId, context) => {
      queryClient.setQueryData(["users"], context.previousData);
      toast.error("Failed to delete user");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    addUserMutation,
    updateUserMutation,
    deleteUserMutation,
  };
}
