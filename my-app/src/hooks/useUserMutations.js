import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, updateUser, deleteUser } from "../api/userService";

export default function useUserMutations() {
  const queryClient = useQueryClient();

  // ADD USER
  const addUserMutation = useMutation({
    mutationFn: addUser,

    // Optimistic Add
    onMutate: async (newUser) => {
      // Stop ongoing queries
      await queryClient.cancelQueries({
        queryKey: ["users"],
      });

      // Snapshot previous users
      const previousUsers = queryClient.getQueryData(["users"]);

      // Add instantly
      queryClient.setQueryData(["users"], (oldUsers = []) => [
        newUser,
        ...oldUsers,
      ]);

      // Return snapshot
      return { previousUsers };
    },

    // Rollback if failed
    onError: (error, newUser, context) => {
      queryClient.setQueryData(["users"], context.previousUsers);
    },

    // Final Sync
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  // UPDATE USER
  const updateUserMutation = useMutation({
    mutationFn: ({ id, userData }) => updateUser(id, userData),

    // Optimistic Update
    onMutate: async ({ id, userData }) => {
      // Stop active requests
      await queryClient.cancelQueries({
        queryKey: ["users"],
      });

      // Snapshot old users
      const previousUsers = queryClient.getQueryData(["users"]);

      // Instantly update cache
      queryClient.setQueryData(["users"], (oldUsers = []) =>
        oldUsers.map((user) =>
          user.id === id
            ? {
                ...user,
                ...userData,
              }
            : user,
        ),
      );

      // Return snapshot
      return { previousUsers };
    },

    // Rollback if failed
    onError: (error, variables, context) => {
      queryClient.setQueryData(["users"], context.previousUsers);
    },

    // Final sync
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  // DELETE USER
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,

    // Before API Request
    onMutate: async (deletedUserId) => {
      // Stop ongoing queries
      await queryClient.cancelQueries({
        queryKey: ["users"],
      });

      // Snapshot previous users
      const previousUsers = queryClient.getQueryData(["users"]);

      // Instantly remove user
      queryClient.setQueryData(["users"], (oldUsers = []) =>
        oldUsers.filter((user) => user.id !== deletedUserId),
      );

      // Return snapshot for rollback
      return { previousUsers };
    },

    // Rollback if API fails
    onError: (error, deletedUserId, context) => {
      queryClient.setQueryData(["users"], context.previousUsers);
    },

    // Final Sync
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return {
    addUserMutation,
    updateUserMutation,
    deleteUserMutation,
  };
}
