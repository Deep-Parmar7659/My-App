export function getErrorMessage(error) {
  // React Query / API Error
  if (error instanceof Error) {
    return error.message;
  }

  // String Error
  if (typeof error === "string") {
    return error;
  }

  // Unknown Error
  return "Something went wrong";
}
