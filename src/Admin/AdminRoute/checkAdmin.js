export const checkUserAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.roles)) return false;
  const { roles } = currentUser;
  if (roles.includes("admin")) return true;

  return false;
};
