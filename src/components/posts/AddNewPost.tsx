import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser, getIsLoggedIn } from '../../redux/userSlice';
import { Link } from 'react-router-dom';
import CreatePostModal from './CreatePostModal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AddNewPost() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [notLoggedInMessage, setNotLoggedInMessage] = useState(false);

  const isLoggedIn = useSelector(getIsLoggedIn);
  const currentUser = useSelector(getCurrentUser);

  const renderNotLoggedInMessage = () => {
    return (
      <Snackbar
        open={notLoggedInMessage}
        autoHideDuration={6000}
        onClose={() => setNotLoggedInMessage(false)}
      >
        <MuiAlert
          elevation={6}
          variant='filled'
          onClose={() => setNotLoggedInMessage(false)}
          severity='error'
        >
          You must be logged in to post
        </MuiAlert>
      </Snackbar>
    );
  };

  const renderConfirmationMessage = () => {
    return (
      <Snackbar
        open={confirmationMessage}
        autoHideDuration={6000}
        onClose={() => setConfirmationMessage(false)}
      >
        <MuiAlert
          elevation={6}
          variant='filled'
          onClose={() => setConfirmationMessage(false)}
          severity='success'
        >
          Post was successfully added
        </MuiAlert>
      </Snackbar>
    );
  };

  return (
    <div className='w-full'>
      <div className='px-4 py-2 bg-[rgb(43,44,45)] rounded-lg'>
        <div className='w-full h-10 my-1 flex items-center justify-start'>
          <Link to={`/profile/${currentUser.username}`}>
            <img
              src={
                isLoggedIn
                  ? currentUser.profilePictureURL
                  : 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'
              }
              alt='profile pic'
              className='object-cover rounded-full h-10 w-10 mr-3 '
            />
          </Link>

          <button
            className='grow pl-4 pb-[1px] h-full bg-[rgb(62,63,64)] hover:bg-[rgb(74,75,76)] text-zinc-400 text-left text-sm sm:text-base rounded-full'
            onClick={() =>
              isLoggedIn
                ? setModalOpen(!modalOpen)
                : setNotLoggedInMessage(true)
            }
          >
            What's on your mind?
          </button>
          <CreatePostModal
            currentUser={currentUser}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            setConfirmationMessage={setConfirmationMessage}
          />
          {renderNotLoggedInMessage()}
          {renderConfirmationMessage()}
        </div>
      </div>
    </div>
  );
}

export default AddNewPost;
