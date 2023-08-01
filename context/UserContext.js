const { createContext, useState } = require("react");

const UserContext = createContext();

const UserProvider = ({
  user: initialUser,
  setUser: initialSetUser,
  children,
}) => {
  const [user, setUser] = useState(initialUser);

  const updateUser = (newUser) => {
    setUser(newUser);
    initialSetUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
