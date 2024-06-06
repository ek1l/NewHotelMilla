/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useCallback } from 'react';
import styles from './ManageTeam.module.scss';
import deleteIMG from '../../assets/img/deleteIco.svg';
import AddPlayerForm from '../AddPlayerForm/AddPlayerForm';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { verifyTokenUser } from '../../redux/reducers/verifyToken';
import { getAllPlayers } from '../../redux/reducers/getAllPlayers';
import { deletePlayer } from '../../redux/reducers/deletePlayerTeam';
const notifySuccessDeleted = () => toast.success('Member Deleted successfully');
const notifyErrorDeleted = () => toast.error('Member not Deleted');
const ManageTeam = () => {
  const { data } = useSelector((state: any) => state.getAllPlayersSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalAddPlayer, setModalAddPlayer] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 5;
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = useMemo(() => {
    return data.slice(indexOfFirstPlayer, indexOfLastPlayer);
  }, [data, indexOfFirstPlayer, indexOfLastPlayer]);

  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const verifyTokenIsValid = useCallback(async () => {
    const response = await dispatch(verifyTokenUser());
    if (response.type === 'verifyToken/fulfilled') {
      navigate('/admin/login/panel');
    } else {
      localStorage.clear();
      navigate('/');
    }
  }, [dispatch, navigate]);

  const handleDeletePlayer = async (id: number) => {
    // @ts-ignore
    const response = await dispatch(deletePlayer(id));
    if (response.type === 'deletePlayer/fulfilled') {
      notifySuccessDeleted();
      dispatch(getAllPlayers());
      return;
    } else {
      notifyErrorDeleted();
    }
  };

  useEffect(() => {
    dispatch(getAllPlayers());
    if (localStorage.getItem('token')) {
      verifyTokenIsValid();
    } else {
      navigate('/');
      localStorage.clear();
    }
  }, [dispatch, navigate, verifyTokenIsValid]);

  return (
    <section className={`${styles.section} animation`}>
      <ToastContainer closeOnClick autoClose={2000} />
      <div className={styles.title}>
        <h1>Manage Team</h1>
      </div>
      <div className={styles.addPlayer}>
        <button onClick={() => setModalAddPlayer(!modalAddPlayer)}>
          Add Member
        </button>
        {modalAddPlayer && (
          <AddPlayerForm setModalAddPlayer={setModalAddPlayer} />
        )}
      </div>
      {!modalAddPlayer && (
        <>
          {data.length > 0 && (
            <div className={`${styles.titleEdit} animation`}>
              <h1>Edit Members</h1>
            </div>
          )}
          {data.length > 0 ? (
            <div className={`${styles.containerCardsPlayer} animation`}>
              {currentPlayers.map((player: any) => (
                <div key={player.id} className={styles.cardPlayer}>
                  <img
                    className={styles.image}
                    src={`${import.meta.env.VITE_APP_API_IMAGE}/${
                      player.photo
                    }`}
                    alt="card"
                  />
                  <div className={styles.infoPlayer}>
                    <h2>{player.name}</h2>
                    <p>{player.role}</p>
                  </div>
                  <div className={styles.actions}>
                    <button onClick={() => handleDeletePlayer(player.id)}>
                      <img src={deleteIMG} alt="Delete Icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {data.length > 0 ? (
            <div className={styles.pagination}>
              {Array.from(
                { length: Math.ceil(data.length / playersPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`${styles.pageButton} ${
                      currentPage === index + 1
                        ? 'ativobotaopagination2'
                        : 'buttonPaginationEdit'
                    }`}
                  >
                    {index + 1}
                  </button>
                ),
              )}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
};

export default ManageTeam;
