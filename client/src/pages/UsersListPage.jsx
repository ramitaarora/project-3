import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Header from '../components/Header';

export default function UsersListPage() {

    const { loading, data } = useQuery(QUERY_USERS);

    const users = data?.users || [];

    return (
        <main className="usersListPage">
            <Header />
            <h2>Users:</h2>
            <div>
                {loading ? (
                    <div>Loading Users...</div>
                ) : (
                    <div>
                        {users.map((user) => (user._id !== Auth.getProfile().data._id ? (
                            <section key={user._id}>
                                <div>{user.photo}</div>
                                <div>{user.username}</div>
                                <Link to={`/user/${user._id}`}>Go to profile button</Link>
                            </section>
                        ) : null))}
                    </div>
                )}
            </div>
        </main>
    )
}