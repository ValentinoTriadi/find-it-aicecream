import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth.context';

const ProfilePage = () => {
  const auth = useAuth();
  if (!auth.user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is the profile page.</p>
      <p>Id: {auth.user.id}</p>
      <p>Username: {auth.user.user_metadata.name}</p>
      <p>Email: {auth.user.email}</p>
      <Button variant="outline" onClick={() => auth.logout()} className="mt-4">
        Logout
      </Button>
    </div>
  );
};

export default ProfilePage;
