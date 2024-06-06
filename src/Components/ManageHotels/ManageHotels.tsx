/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState, useCallback } from 'react';
import styles from './ManageHotels.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { getAllhotels } from '../../redux/reducers/getAllHotels';
import { verifyTokenUser } from '../../redux/reducers/verifyToken';
import { toggleModalAdminFunction } from '../../redux/reducers/toggleModalFormAdmin';
import CardHotelEditPanel from '../CardHotelEditPanel/CardHotelEdit';
import EditHotel from '../EditHotel/EditHotel';

const ManageHotels = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.getAllhotelsSlice);
  const [openEditCardsHotels, setOpenEditCardsHotels] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [handleEditHotel, setHandleEditHotel] = useState(false);
  const itemsPerPage = 10;
  const maxPageButtons = 5;
  const handleModalAdminForm = () => {
    dispatch(toggleModalAdminFunction());
  };
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginate = useCallback(
    (pageNumber: number) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    },
    [totalPages],
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHotels = data.slice(indexOfFirstItem, indexOfLastItem);
  const renderPageButtons = useCallback(() => {
    const buttons = [];

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={currentPage === i ? 'ativobotaopagination' : ''}
          >
            {i}
          </button>,
        );
      }
    } else {
      const halfMaxButtons = Math.floor(maxPageButtons / 2);
      let startPage = currentPage - halfMaxButtons;
      let endPage = currentPage + halfMaxButtons;

      if (startPage < 1) {
        startPage = 1;
        endPage = maxPageButtons;
      }

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxPageButtons + 1;
      }

      if (startPage > 1) {
        buttons.push(
          <button key={1} onClick={() => paginate(1)}>
            1
          </button>,
        );

        if (startPage > 2) {
          buttons.push(<span key="start">...</span>);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={
              currentPage === i
                ? 'ativobotaopagination2'
                : 'buttonPaginationEdit'
            }
          >
            {i}
          </button>,
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          buttons.push(<span key="end">...</span>);
        }

        buttons.push(
          <button key={totalPages} onClick={() => paginate(totalPages)}>
            {totalPages}
          </button>,
        );
      }
    }
    return buttons;
  }, [currentPage, maxPageButtons, paginate, totalPages]);
  const verifyTokenIsValid = useCallback(async () => {
    const response = await dispatch(verifyTokenUser());
    if (response.type === 'verifyToken/fulfilled') {
      navigate('/admin/login/panel');
    } else {
      localStorage.clear();
      navigate('/');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const loadData = async () => {
      if (localStorage.getItem('token')) {
        await verifyTokenIsValid();
      } else {
        navigate('/');
        localStorage.clear();
      }
      if (data.length === 0) {
        dispatch(getAllhotels());
      }
    };

    loadData();
  }, [dispatch, navigate, verifyTokenIsValid]);

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredHotels = currentHotels.filter((hotel: any) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className={`${styles.main} animation`}>
      <header className={styles.header}>
        <h1>Manage Hotels</h1>
      </header>
      <div className={styles.containerOptions}>
        <h1>Choose option</h1>
        {data.length > 0 ? (
          <div className={styles.optionEDIT}>
            <div
              onClick={() => setOpenEditCardsHotels(!openEditCardsHotels)}
              className={styles.titleEdit}
            >
              <h1>Edit hotels</h1>
            </div>
            <div className={`${styles.containerCardsHotels} animation`}>
              {openEditCardsHotels && (
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              )}
              {openEditCardsHotels && filteredHotels.length > 0
                ? filteredHotels.map((hotel: any) => (
                    <CardHotelEditPanel
                      descriptionHotelAccommodation={
                        hotel.description.accommodation
                      }
                      setHandleEditHotel={setHandleEditHotel}
                      star={
                        hotel.rating.rating.toLowerCase().includes('stars')
                          ? parseInt(
                              hotel.rating.rating
                                .toLowerCase()
                                .replace('stars', ''),
                              10,
                            )
                          : parseInt(
                              hotel.rating.rating
                                .toLowerCase()
                                .replace('star', ''),
                              10,
                            )
                      }
                      nameHotel={hotel.name}
                      city={hotel.city.name}
                      country={hotel.city.country.name}
                      key={hotel.id}
                      facilities={hotel.facilities}
                      id={hotel.id}
                      imageHotel={hotel.images[0]}
                    />
                  ))
                : null}
            </div>

            {openEditCardsHotels && (
              <div className={styles.pagination}>{renderPageButtons()}</div>
            )}
          </div>
        ) : (
          <h1>No hotels</h1>
        )}
        <div onClick={handleModalAdminForm} className={styles.optionAddNew}>
          <h1>Add new hotel</h1>
        </div>
      </div>
      {handleEditHotel && <EditHotel setHandleEditHotel={setHandleEditHotel} />}
    </main>
  );
};

export default ManageHotels;
