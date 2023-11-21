import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, CHAT_EXISTS } from '../utils/queries';
import { NEW_CHAT, ADD_FRIEND } from '../utils/mutations';
import FriendHeader from '../components/FriendHeader';
import Auth from '../utils/auth';

const AddFriendNotification = ({ onClose }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose();
        }, 1000);
        return () => clearTimeout(timeout);
    });

    return (
        <div>New Friend Added!</div>
    )
}

export default function FriendProfilePage() {

    const { userID } = useParams();

    const [showNotification, setShowNotification] = useState(false);

    const hideNotification = () => {
        setShowNotification(false);
    }

    // Add Friend Handler

    const [addFriend, { friendErr }] = useMutation(ADD_FRIEND);

    const handleAddFriend = async (ID) => {
        console.log('adding friend');
        try {
            await addFriend({
                variables: { friend: ID }
            });
        } catch (e) {
            console.log(e);
            console.log(friendErr);
        }

    };

    // New Chat Handler

    const [addChat, { chatErr }] = useMutation(NEW_CHAT);

    const { loading: chatLoading, data: chatData, refetch } = useQuery(CHAT_EXISTS, {
        variables: { user2: userID }
    });

    const handleNewChat = async (ID, ifExists) => {
        try {
            if (ifExists) {
                console.log('found exists');
                console.log(chatData.chatExists._id)
                const chatID = chatData.chatExists._id;
                document.location.replace(`/chat/${chatID}`);
                return ifExists;
            } else {
                const { data } = await addChat({
                    variables: { user2: ID }
                })
                const newChatID = data?.newChat._id;
                document.location.replace(`/chat/${newChatID}`);
                console.log('new chat created');
                refetch();
                return data;
            }

        } catch (e) {
            console.log(e);
            console.log(chatErr);
        }
    };

    // Loading User Profile Page

    const { loading: userLoading, data: userData } = useQuery(QUERY_USER, {
        variables: { id: userID }
    });

    if (Auth.loggedIn()) {
        if (userLoading || chatLoading) {
            return (
                <div>Loading User Profile...</div>
            )
        } else if (userData && chatData) {

            const user = userData?.user;
            const ifExists = chatData?.chatExists;

            return (
                <main className='centered'>
                    <FriendHeader userID={userID} />
                    <div>
                        <img className="profilePicture" src={user.photo}></img>
                        <div>{user.fullName}</div>
                        <div>{user.bio}</div>
                    </div>
                    <button id="add-friend" onClick={() => { handleAddFriend(user._id); setShowNotification(true) }}>
                        <img src="../src/assets/plus.png" id="editImg" />
                    </button>
                    <button id="start-chat" onClick={() => handleNewChat(user._id, ifExists)}>
                        <img src="../src/assets/start-chat.svg" id="chatImg"></img>
                    </button>
                    {showNotification && (
                        <AddFriendNotification onClose={hideNotification}/>
                    )}
                </main>
            )
        }
    } else {
        document.location.replace('/');
    }
}