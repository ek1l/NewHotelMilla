/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import styles from './AddPlayerForm.module.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/store';

import { toast } from 'react-toastify';
import { createNewPlayer } from '../../redux/reducers/createNewPlayerTeam';
import { getAllPlayers } from '../../redux/reducers/getAllPlayers';
import InputPanelAdmin from '../InputPanelAdmin/InputPanelAdmin';

const notifySuccessCreate = () => toast.success('Member Created successfully');
const notifyErrorCreate = () => toast.error('Member not Created');

const AddPlayerForm = ({ setModalAddPlayer }: any) => {
  const { register, handleSubmit } = useForm();

  const dispatch = useAppDispatch();

  const submit = async (formData: any) => {
    const { name, role, team } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('role', role);
    formDataToSend.append('team', team[0]);
    const response = await dispatch(createNewPlayer(formDataToSend));
    if (response.type === 'createNewPlayer/fulfilled') {
      notifySuccessCreate();
      dispatch(getAllPlayers());
      setModalAddPlayer(false);
      return response;
    } else {
      notifyErrorCreate();
    }
  };

  return (
    <div className={`${styles.container} animation`}>
      <form onSubmit={handleSubmit(submit)}>
        <div className={styles.title}>
          <h1>Add member</h1>
        </div>
        <InputPanelAdmin {...register('name')} type="text" label="Name" />
        <InputPanelAdmin {...register('role')} type="text" label="Member" />
        <div className={styles.fileContainer}>
          <InputPanelAdmin
            {...register('team')}
            label="Photo Member"
            type="file"
            width="100%"
            height="100%"
          />
        </div>
        <button type="submit"> Add </button>
      </form>
    </div>
  );
};

export default AddPlayerForm;
