module.exports = function (user) {
  return {
    id: user.id,
    login: user.login,
    email: user.email,
    roleId: user.role_id,
  };
};
