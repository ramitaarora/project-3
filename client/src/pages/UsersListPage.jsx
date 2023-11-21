import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Header from '../components/Header';

export default function UsersListPage() {

    const { loading, data } = useQuery(QUERY_USERS);

    const users = data?.users || [];

    if (Auth.loggedIn()) {
        return (
            <main className="usersListPage">
                <Header />
                <h2>Users:</h2>
                <div className='centered'>
                    {loading ? (
                        <div>Loading Users...</div>
                    ) : (
                        <div>
                            {users.map((user) => (user._id !== Auth.getProfile().data._id ? (
<<<<<<< HEAD
                                <section key={user._id} className='padding'>
                                    <div><img id="userPfp" src={user.photo} alt="friendProfile" /></div>
=======
                                <section key={user._id}>
                                    <img className="profilePicture" src={user.photo}></img>
>>>>>>> main
                                    <div><h3>@ {user.username}</h3></div>
                                    <Link to={`/user/${user._id}`}><button id="view-profile-btn">view profile</button></Link>
                                </section>
                            ) : null))}
                        </div>
                    )}
                </div>
            </main>
        )
    } else {
        document.location.replace('/');
    }
    
}