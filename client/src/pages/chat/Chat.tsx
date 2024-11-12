import UserProvider from '../../contextProviders/userProvider/UserProvider';

const Chat = () => {
  return (
    <UserProvider>
      <div>Chat</div>
    </UserProvider>
  );
};

export default Chat;
