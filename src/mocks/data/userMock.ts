let users = [
  {
    id: "id_de_luser",
    name: "Jean Dupont",
    email: "jean@jean.com",
    password: "jeanjean",
  },
];

export const findUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};

export const addUser = (name: string, email: string, password: string) => {
  const newUser = {
    id: `user-${users.length + 1}`,
    name,
    email,
    password,
  };
  users.push(newUser);
  return newUser;
};
