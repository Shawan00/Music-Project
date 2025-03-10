import { memo, useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import { postGenre } from '../../../services/Admin/genreService';
import { capitalizeFirstLetter } from '../../../helpers';

function CreateGenre(props) {
  const { onReload } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: null,
    description: ""
  });
  const [imagePreview, setImagePreview] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = async () => {
      const res = await postGenre({
        title: capitalizeFirstLetter(formData.title),
        thumbnail: formData.thumbnail,
        description: formData.description
      });
      if (res.data.code === 200) {
        toast.success('Create genre successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        closeModal();
        onReload();
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        closeModal()
      }
    }
    postData();
  }

  const closeModal = () => {
    setImagePreview(null);
    setIsModalOpen(false);
  }

  return (
    <>
      <ToastContainer />
      <button onClick={showModal}>Create</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        preventScroll={true}
      >
        <h3>Add a new genre</h3>
        <button onClick={closeModal}><IoMdClose /></button>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input type='text' placeholder='Title' name='title' onChange={handleChange} required></input>
          </label>
          <label>
            Thumnail
            <input type='file' name='thumbnail' onChange={handleChange} required></input>
            {imagePreview && (<img src={imagePreview} alt='Uploaded'></img>)}
          </label>
          <label>
            Description
            <textarea rows={4} placeholder='Description' name='description' onChange={handleChange} required></textarea>
          </label>
          <button onClick={closeModal}>Cancel</button>
          <button type='submit'>OK</button>
        </form>
      </Modal>
    </>
  );
}

export default memo(CreateGenre)