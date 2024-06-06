/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import styles from './CardHotelEditPanel.module.scss';
import StarIMG from '../../assets/img/estrela.png';
import EditIMG from '../../assets/img/editIco.svg';
import DeleteIMG from '../../assets/img/deleteIco.svg';
import { useAppDispatch } from '../../redux/store';
import { deleteHotel } from '../../redux/reducers/deleteHotel';
import { setIdHotel } from '../../redux/reducers/editHotel';
import { getAllhotels } from '../../redux/reducers/getAllHotels';

const CardHotelEditPanel = ({
  setHandleEditHotel,
  descriptionHotelAccommodation,
  nameHotel,
  city,
  country,
  star,
  facilities,
  id,
  imageHotel,
}: any) => {
  const dispatch = useAppDispatch();

  const description = descriptionHotelAccommodation;
  const truncatedDescription =
    description.length > 122 ? `${description.slice(0, 122)}...` : description;
  const limMaxNameHotel = 40;
  const truncatedNameHotel =
    nameHotel.length > limMaxNameHotel
      ? `${nameHotel.slice(0, limMaxNameHotel)}...`
      : nameHotel;

  const handleDeleteHotel = async (id: number) => {
    // @ts-ignore
    const response = await dispatch(deleteHotel(id));

    if (response.type === 'deleteHotel/fulfilled') {
      dispatch(getAllhotels());
      return response;
    }
  };
  const getIdHotelEdit = (id: number) => {
    dispatch(setIdHotel(id));
    setHandleEditHotel(true);
  };

  return (
    <div className={`${styles.card} animation`}>
      <div className={styles.imageContainer}>
        <img
          src={
            imageHotel?.path
              ? `${import.meta.env.VITE_APP_API_IMAGE}/${imageHotel.path}`
              : ''
          }
          alt="image hotel"
        />
      </div>
      <div className={styles.info}>
        <div className={styles.titleAndLocal}>
          <h1>{truncatedNameHotel}</h1>
          <p>
            {country}, {city}
          </p>
        </div>
        <div className={styles.facilities}>
          {facilities.length > 0
            ? facilities.map((facilitie: any) => (
                <div key={facilitie.id} className={styles.facility}>
                  <img
                    className={styles.imgCardFacilities}
                    src={`${import.meta.env.VITE_APP_API_IMAGE}/${
                      facilitie.icon
                    }`}
                    alt="Facilitie Icon"
                  />
                  <p>{facilitie.facility}</p>
                </div>
              ))
            : null}
        </div>
        <div className={styles.description}>
          <p>{truncatedDescription}</p>
        </div>
        <div className={styles.stars}>
          <span>{star}</span>
          <img src={StarIMG} alt="stars" />
        </div>
        <div className={styles.actions}>
          <button onClick={() => getIdHotelEdit(id)} className={styles.edit}>
            <img src={EditIMG} alt="Edit Image" />
          </button>
          <button
            onClick={() => handleDeleteHotel(id)}
            className={styles.delete}
          >
            <img src={DeleteIMG} alt="Delete Image" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardHotelEditPanel;
