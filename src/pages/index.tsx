import { Button, Box } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = async ({pageParam = 1}) => {
    const res = await api.get('api/images')
    const { data } = res.data;
    return {
      data,
    };
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fetchImages,
    {
      getNextPageParam: l => l.data.pageParams
    }
  );

  useEffect(() => {console.log(data )}, [data])

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
  }, [data]);

  const handleFetchNextPage = () => {
    fetchNextPage: fetchImages
  }

  // TODO RENDER LOADING SCREEN
  if (isLoading){
    return (
      <Loading />
    )
  }

  // TODO RENDER ERROR SCREEN
  if (isError) {
    return (
      <Error />
    )
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}

        {hasNextPage && (
          <Button 
            isLoading={isFetchingNextPage}
            loadingText="Carregando..."
            onClick={() => fetchNextPage()}>
              Ver mais
          </Button>
        )}
      </Box>
    </>
  );
}
