import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import PageShell from '../components/PageShell/PageShell';
import Button from '../components/Button/Button';
import './css/addpage.css';

function Post() {
  const [sendData, setDataToSend] = useState({ title: '', subTitle: '' });
  const [elements, addElement] = useState([
    { id: 1, type: 'text', content: '' },
  ]);

  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    setDataToSend((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTextChange = (event, id) => {
    const { value } = event.target;
    addElement((prevElements) =>
      prevElements.map((el) => (el.id === id ? { ...el, content: value } : el))
    );
  };

  async function savePost() {
    const formData = new FormData();

    const structure = elements
      .filter((el) => el.type !== 'button')
      .map((el) => {
        if (el.type === 'image') {
          return { id: el.id, type: 'image', src: null };
        }
        return { id: el.id, type: 'text', content: el.content ?? '' };
      });

    formData.append('structure', JSON.stringify(structure));
    formData.append('title', sendData.title);
    formData.append('subTitle', sendData.subTitle);

    elements.forEach((el) => {
      if (el.type === 'image' && el.file) {
        formData.append(`image_${el.id}`, el.file);
      }
    });

    try {
      const response = await fetch('http://localhost:3000/createPage/addpage', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        alert('Erro em salvar a imagem do usuario!, delete a imagem e tente novamente!');
      }
    } catch (error) {
      console.log('erro em salvar a imagem no servidor', error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await savePost();
  };

  const addImage = (file) => {
    const newImage = {
      id: Date.now(),
      type: 'image',
      name: 'Imagem do post',
      file,
      src: URL.createObjectURL(file),
    };

    const deleteButton = {
      id: Date.now() + 1,
      type: 'button',
    };

    const newTextArea = {
      id: Date.now() + 2,
      type: 'text',
      content: '',
    };

    addElement((prevElements) => [...prevElements, newImage, deleteButton, newTextArea]);
  };

  const dragEvents = {
    onDragEnter: (event) => event.preventDefault(),
    onDragLeave: (event) => event.preventDefault(),
    onDragOver: (event) => event.preventDefault(),
    onDrop: (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        addImage(file);
      }
    },
  };

  return (
    <PageShell>
      <div className="editor__dropzone" {...dragEvents}>
        <form className="editor" onSubmit={handleSubmit}>
          <textarea
            name="title"
            className="title"
            placeholder="Insert the title of your Post!"
            onChange={handleTitleChange}
          />
          <textarea
            name="subTitle"
            className="subtitle"
            placeholder="Insert the subtitle of your Post!"
            onChange={handleTitleChange}
          />

          <div className="content-block">
            {elements.map((el) => {
              if (el.type === 'image') {
                return (
                  <img
                    key={el.id}
                    src={el.src}
                    alt={el.name}
                    className="image-block"
                  />
                );
              }

              if (el.type === 'button') {
                return (
                  <Button key={el.id} className="editor__delete">
                    Delete Image
                  </Button>
                );
              }

              return (
                <TextareaAutosize
                  key={el.id}
                  className="text-block"
                  onChange={(event) => handleTextChange(event, el.id)}
                />
              );
            })}
          </div>

          <Button type="submit" className="editor__submit">Post!</Button>
        </form>
      </div>
    </PageShell>
  );
}

export default Post;
