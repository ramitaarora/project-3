import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import Header from '../components/Header';

export default function AddFriendPage() {

    const { loading, data } = useQuery(QUERY_USERS);

    const users = data?.users || [];

    const handleAddFriend = () => {
        // Finish after adding friend category to users 
    };

    return (
        <main>
            <Header />
            <div>Add Friends</div>
            <div>
                {loading ? (
                    <div>Loading Users...</div>
                ) : (
                    <div>
                        {users.map((user) => (
                            <section key={user._id}>
                                <div>{user.photo}</div>
                                <div>{user.username}</div>
                                <button onClick={handleAddFriend}>+</button>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}