import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

const App = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    setIsLoading(true);

    axios({
      url: `https://pixabay.com/api/?`,
      params: {
        q: searchName,
        page: page,
        key: '34372801-bdf4656b48ac6c16d1f8b32cb',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    })
      .then(response => {
        return response.data;
      })
      .then(({ hits, totalHits }) => {
        if (hits.length > 0) {
          setItems(prevItems => [...prevItems, ...hits]);
          setTotalHits(totalHits);

          return;
        }
        toast('За вашим запитом нічого не знайдено', { autoClose: 3000 });
      })
      .catch(({ message }) => {
        message = toast('Щось пішло не так, спробуйте ще раз');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchName, page]);

  const searchImage = searchName => {
    setSearchName(searchName);
    setPage(1);
    setItems([]);
  };

  const handleClick = () => {
    setPage(page => page + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={searchImage} />

      {items.length > 0 && <ImageGallery items={items} />}

      {isLoading && <Loader />}

      {items.length > 0 && items.length % 12 <= 0 && !isLoading && (
        <Button onClick={handleClick} />
      )}

      <ToastContainer />
    </Container>
  );
};

export default App;
